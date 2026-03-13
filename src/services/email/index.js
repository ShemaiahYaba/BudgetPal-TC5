import settings from '../../config/settings.js';
import transporter from './transporter.js';
import { welcomeTemplate } from './templates/welcome.js';
import { passwordResetTemplate } from './templates/passwordReset.js';
import { reportTemplate } from './templates/report.js';

/**
 * Core send function. All exported senders delegate here.
 * @param {{ to: string, subject: string, html: string }} options
 */
const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({ from: settings.mail.from, to, subject, html });
};

/**
 * Welcome email — fire-and-forget, called after register.
 * @param {{ name: string, email: string }} user
 */
export const sendWelcomeEmail = (user) => {
  sendEmail({
    to: user.email,
    subject: 'Welcome to BudgetPal',
    html: welcomeTemplate(user),
  }).catch((err) => console.error('[Email] Welcome email failed:', err.message));
};

/**
 * Password reset email — fire-and-forget, called from forgotPassword.
 * @param {{ name: string, email: string }} user
 * @param {string} resetUrl
 */
export const sendPasswordResetEmail = (user, resetUrl) => {
  sendEmail({
    to: user.email,
    subject: 'BudgetPal — Password Reset',
    html: passwordResetTemplate(user, resetUrl),
  }).catch((err) => console.error('[Email] Password reset email failed:', err.message));
};

/**
 * Monthly summary report email — fire-and-forget.
 * @param {{ name: string, email: string }} user
 * @param {object} report
 */
export const sendReportEmail = (user, report) => {
  sendEmail({
    to: user.email,
    subject: 'BudgetPal — Your Financial Report',
    html: reportTemplate(user, report),
  }).catch((err) => console.error('[Email] Report email failed:', err.message));
};
