import { emailLayout } from './layout.js';

/**
 * @param {{ name: string, email: string }} user
 */
export const welcomeTemplate = (user) => {
  const content = `
    <!-- Greeting -->
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#14532d;">Welcome to BudgetPal, ${user.name}!</h1>
    <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">Your account has been created. You can now log in and start tracking your finances.</p>

    <!-- Divider -->
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;" />

    <!-- Account details box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:28px;">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">Your Account Details</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;width:80px;">Name</td>
              <td style="padding:6px 0;font-size:13px;font-weight:600;color:#1e293b;">${user.name}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;">Email</td>
              <td style="padding:6px 0;font-size:13px;font-weight:600;color:#1e293b;">${user.email}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- CTA hint -->
    <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">
      Log in using your email address and password to get started. Set up your categories and budgets to take control of your finances.
    </p>
  `;

  return emailLayout(content, `Welcome to BudgetPal, ${user.name}! Your account is ready.`);
};
