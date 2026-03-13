/**
 * Budget alert email template.
 * @param {{ name: string }} user
 * @param {{ category: object, spent: number, limit: number, percentage: number, status: string }} alert
 */
export const budgetAlertTemplate = (user, alert) => {
  const { category, spent, limit, percentage, status } = alert;
  const isExceeded = status === 'exceeded';
  const headerColor = isExceeded ? '#dc2626' : '#d97706';
  const headerBg = isExceeded ? '#fee2e2' : '#fef3c7';
  const headline = isExceeded
    ? `You have exceeded your ${category.name} budget!`
    : `You are approaching your ${category.name} budget limit.`;

  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:8px;">
      <h2 style="color:${headerColor};margin-bottom:4px;">Budget Alert</h2>
      <p style="color:#64748b;margin-top:0;">Hi ${user.name},</p>
      <div style="background:${headerBg};border-left:4px solid ${headerColor};padding:16px;border-radius:4px;margin:16px 0;">
        <p style="margin:0;font-weight:600;color:${headerColor};">${headline}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tr style="background:#f1f5f9;">
          <td style="padding:10px 16px;color:#64748b;">Category</td>
          <td style="padding:10px 16px;font-weight:600;text-align:right;">${category.name}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;color:#64748b;">Budget Limit</td>
          <td style="padding:10px 16px;font-weight:600;text-align:right;">$${Number(limit).toFixed(2)}</td>
        </tr>
        <tr style="background:#f1f5f9;">
          <td style="padding:10px 16px;color:#64748b;">Amount Spent</td>
          <td style="padding:10px 16px;font-weight:600;text-align:right;">$${Number(spent).toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding:10px 16px;color:#64748b;">Usage</td>
          <td style="padding:10px 16px;font-weight:700;text-align:right;color:${headerColor};">${Math.round(percentage)}%</td>
        </tr>
      </table>
      <p style="color:#94a3b8;font-size:12px;margin-top:32px;">BudgetPal · Personal Finance Tracker</p>
    </div>
  `;
};
