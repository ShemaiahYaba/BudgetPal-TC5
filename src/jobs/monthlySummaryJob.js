import cron from 'node-cron';
import { User } from '../models/index.js';
import { emailReport } from '../services/reportService.js';

// Runs at 08:00 on the 1st of every month
const monthlySummaryJob = cron.schedule('0 8 1 * *', async () => {
  console.log('[Cron] Running monthly summary email sweep...');

  // Target: the previous calendar month
  const now = new Date();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  const year  = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  try {
    const users = await User.findAll();
    let sent = 0;

    for (const user of users) {
      try {
        await emailReport(user.id, { month, year });
        sent++;
      } catch (err) {
        console.error(`[Cron] Failed to send monthly summary to user ${user.id}:`, err.message);
      }
    }

    console.log(`[Cron] Monthly summary sweep complete — ${sent}/${users.length} email(s) sent for ${month}/${year}.`);
  } catch (err) {
    console.error('[Cron] Monthly summary sweep failed:', err.message);
  }
}, { scheduled: false });

export default monthlySummaryJob;
