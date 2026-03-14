/* ── Reports page ── */
requireAuth();

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const now    = new Date();

const monthSel   = document.getElementById('month-select');
const yearSel    = document.getElementById('year-select');
const trendYrSel = document.getElementById('trend-year');
const typeSel    = document.getElementById('f-type');

months.forEach((m, i) => {
  const o = new Option(m, i + 1);
  if (i + 1 === now.getMonth() + 1) o.selected = true;
  monthSel.appendChild(o);
});

for (let y = now.getFullYear(); y >= now.getFullYear() - 3; y--) {
  yearSel.appendChild(new Option(y, y, false, y === now.getFullYear()));
  trendYrSel.appendChild(new Option(y, y, false, y === now.getFullYear()));
}

const loadSummary = async () => {
  const m = monthSel.value, y = yearSel.value;
  document.getElementById('period-label').textContent = `${months[m - 1]} ${y}`;

  const typeFilter = typeSel.value ? `&type=${typeSel.value}` : '';
  const [summary, byCat] = await Promise.all([
    get(`/reports/summary?month=${m}&year=${y}`),
    get(`/reports/by-category?month=${m}&year=${y}${typeFilter}`),
  ]);

  if (summary?.success) {
    document.getElementById('total-income').textContent   = fmt(summary.data.total_income);
    document.getElementById('total-expenses').textContent = fmt(summary.data.total_expenses);
    const net   = summary.data.net;
    const netEl = document.getElementById('net');
    netEl.textContent = fmt(net);
    netEl.className   = 'text-3xl font-bold ' + (net >= 0 ? 'text-emerald-600' : 'text-red-600');
  }

  const catList = document.getElementById('category-list');
  const noCat   = document.getElementById('no-category');
  catList.innerHTML = '';

  if (byCat?.success && byCat.data.length) {
    noCat.classList.add('hidden');
    const maxTotal = Math.max(...byCat.data.map(r => r.total), 1);
    byCat.data.forEach(r => {
      const pct      = Math.round((r.total / maxTotal) * 100);
      const barColor = r.category.type === 'expense' ? 'bg-red-500' : 'bg-emerald-500';
      const amtClass = r.category.type === 'expense' ? 'text-red-600 font-semibold' : 'text-emerald-600 font-semibold';
      catList.innerHTML += `
        <div class="mb-3.5">
          <div class="flex justify-between text-sm mb-1">
            <span class="font-medium">${r.category.name}
              <span class="text-xs text-slate-400 font-normal">(${r.category.type})</span>
            </span>
            <span class="${amtClass}">${fmt(r.total)}</span>
          </div>
          <div class="bg-slate-200 rounded-full h-2 overflow-hidden">
            <div class="${barColor} h-full rounded-full transition-all duration-300" style="width:${pct}%;"></div>
          </div>
        </div>`;
    });
  } else {
    noCat.classList.remove('hidden');
  }
};

const loadMonthly = async () => {
  const y    = trendYrSel.value;
  const res  = await get(`/reports/monthly?year=${y}`);
  const body = document.getElementById('monthly-body');
  const none = document.getElementById('no-monthly');
  body.innerHTML = '';

  if (!res?.success || !res.data.length) {
    none.classList.remove('hidden');
    return;
  }
  none.classList.add('hidden');

  res.data.forEach(r => {
    const netClass = r.net >= 0 ? 'text-right text-emerald-600 font-semibold' : 'text-right text-red-600 font-semibold';
    body.innerHTML += `<tr>
      <td class="px-3 py-3 border-b border-slate-100 text-sm">${months[r.month - 1]}</td>
      <td class="px-3 py-3 border-b border-slate-100 text-right text-emerald-600 font-semibold text-sm">${fmt(r.total_income)}</td>
      <td class="px-3 py-3 border-b border-slate-100 text-right text-red-600 font-semibold text-sm">${fmt(r.total_expenses)}</td>
      <td class="px-3 py-3 border-b border-slate-100 ${netClass} text-sm">${fmt(r.net)}</td>
    </tr>`;
  });
};

document.getElementById('btn-email').addEventListener('click', async () => {
  const btn = document.getElementById('btn-email');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  const res = await post('/reports/email', {
    month: parseInt(monthSel.value),
    year:  parseInt(yearSel.value),
  });

  btn.disabled = false;
  btn.textContent = 'Email Report';

  const toast = document.getElementById('email-toast');
  toast.textContent  = res?.success ? 'Report emailed successfully!' : (res?.message || 'Failed to send.');
  toast.className    = `fixed bottom-6 right-6 text-white px-5 py-3 rounded-lg text-sm shadow-lg z-50 ${res?.success ? 'bg-emerald-800' : 'bg-red-800'}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
});

monthSel.addEventListener('change', loadSummary);
yearSel.addEventListener('change', loadSummary);
typeSel.addEventListener('change', loadSummary);
trendYrSel.addEventListener('change', loadMonthly);

loadSummary();
loadMonthly();
