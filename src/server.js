'use strict';

require('dotenv').config();

const app = require('./app');
const settings = require('./config/settings');

app.listen(settings.port, () => {
  console.log(`BudgetPal API running on port ${settings.port} [${settings.nodeEnv}]`);
});
