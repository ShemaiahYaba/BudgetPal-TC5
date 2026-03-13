import cron from 'node-cron';
import { runDailyBudgetAlertSweep } from '../services/budgetAlertService.js';

// Runs every day at 08:00
const budgetAlertJob = cron.schedule('0 8 * * *', async () => {
  console.log('[Cron] Running daily budget alert sweep...');
  try {
    await runDailyBudgetAlertSweep();
  } catch (err) {
    console.error('[Cron] Budget alert sweep failed:', err.message);
  }
}, { scheduled: false });

export default budgetAlertJob;
