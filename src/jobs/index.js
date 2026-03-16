import budgetAlertJob from './budgetAlertJob.js';
import monthlySummaryJob from './monthlySummaryJob.js';

export const startJobs = () => {
  budgetAlertJob.start();
  console.log('[Jobs] Budget alert cron scheduled (daily at 08:00)');

  monthlySummaryJob.start();
  console.log('[Jobs] Monthly summary cron scheduled (1st of every month at 08:00)');
};
