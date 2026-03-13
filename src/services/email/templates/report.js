/**
 * Monthly summary report email template.
 * @param {{ name: string }} user
 * @param {{ period: object, total_income: number, total_expenses: number, net: number }} report
 */
export const reportTemplate = (user, report) => {
  const { period, total_income, total_expenses, net } = report;
  const label = period.start_date
    ? `${period.start_date} – ${period.end_date}`
    : `${period.month}/${period.year}`;

  const netColor = net >= 0 ? '#16a34a' : '#dc2626';

  return `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:8px;">
      <h2 style="color:#1e293b;margin-bottom:4px;">BudgetPal Report</h2>
      <p style="color:#64748b;margin-top:0;">Hi ${user.name}, here is your financial summary for <strong>${label}</strong>.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:24px;">
        <tr style="background:#dcfce7;">
          <td style="padding:12px 16px;font-weight:600;color:#166534;">Total Income</td>
          <td style="padding:12px 16px;text-align:right;font-weight:700;color:#166534;">$${Number(total_income).toFixed(2)}</td>
        </tr>
        <tr style="background:#fee2e2;">
          <td style="padding:12px 16px;font-weight:600;color:#991b1b;">Total Expenses</td>
          <td style="padding:12px 16px;text-align:right;font-weight:700;color:#991b1b;">$${Number(total_expenses).toFixed(2)}</td>
        </tr>
        <tr style="background:#f1f5f9;">
          <td style="padding:12px 16px;font-weight:700;color:#1e293b;">Net</td>
          <td style="padding:12px 16px;text-align:right;font-weight:700;color:${netColor};">$${Number(net).toFixed(2)}</td>
        </tr>
      </table>
      <p style="color:#94a3b8;font-size:12px;margin-top:32px;">BudgetPal · Personal Finance Tracker</p>
    </div>
  `;
};
