import './config/settings.js';
import app from './app.js';
import settings from './config/settings.js';

app.listen(settings.port, () => {
  console.log(`BudgetPal API running on port ${settings.port} [${settings.nodeEnv}]`);
});
