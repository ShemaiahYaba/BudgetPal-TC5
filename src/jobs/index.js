import budgetAlertJob from './budgetAlertJob.js';

export const startJobs = () => {
  budgetAlertJob.start();
  console.log('[Jobs] Budget alert cron scheduled (daily at 08:00)');
};
