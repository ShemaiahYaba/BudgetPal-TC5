import { emailLayout } from './layout.js';

/**
 * @param {{ name: string, email: string }} user
 * @param {string} resetUrl - Full reset URL containing the raw token
 */
export const passwordResetTemplate = (user, resetUrl) => {
  const content = `
    <!-- Heading -->
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#14532d;">Password Reset Request</h1>
    <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.6;">Hi ${user.name}, we received a request to reset your BudgetPal password.</p>

    <!-- Divider -->
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 28px;" />

    <!-- CTA button -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td align="center">
          <a href="${resetUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:6px;">Reset My Password</a>
        </td>
      </tr>
    </table>

    <!-- Expiry note -->
    <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.6;">
      This link expires in <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email — your password will not change.
    </p>

    <!-- Raw link fallback -->
    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
      If the button above doesn't work, copy and paste this link into your browser:<br>
      <span style="color:#16a34a;word-break:break-all;">${resetUrl}</span>
    </p>
  `;

  return emailLayout(content, `Reset your BudgetPal password — link expires in 1 hour.`);
};
