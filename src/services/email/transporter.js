import nodemailer from 'nodemailer';
import settings from '../../config/settings.js';

export default nodemailer.createTransport({
  host: settings.mail.host,
  port: settings.mail.port,
  secure: settings.mail.port === 465,
  auth: {
    user: settings.mail.user,
    pass: settings.mail.pass,
  },
});
