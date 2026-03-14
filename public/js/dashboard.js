/* ── Dashboard page ── */
requireAuth();

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const now    = new Date();

const monthSel = document.getElementById('month-select');
const yearSel  = document.getElementById('year-select');

months.forEach((m, i) => {
  const o = new Option(m, i + 1);
  if (i + 1 === now.getMonth() + 1) o.selected = true;
  monthSel.appendChild(o);
});

for (let y = now.getFullYear(); y >= now.getFullYear() - 3; y--) {
  const o = new Option(y, y);
  if (y === now.getFullYear()) o.selected = true;
  yearSel.appendChild(o);
}

const BADGE = {
  safe:     'inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800',
  warning:  'inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800',
  exceeded: 'inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800',
};

const BAR = {
  safe:     'h-full rounded-full transition-all duration-300 bg-emerald-500',
  warning:  'h-full rounded-full transition-all duration-300 bg-amber-500',
  exceeded: 'h-full rounded-full transition-all duration-300 bg-red-500',
};

const getBudgetStatus = (b) => {
  const spent  = parseFloat(b.spent ?? 0);
  const limit  = parseFloat(b.limit_amount);
  const pct    = limit > 0 ? Math.round((spent / limit) * 100) : 0;
  const status = pct >= 100 ? 'exceeded' : pct >= 80 ? 'warning' : 'safe';
  return { spent, limit, pct, status };
};

const load = async () => {
  const m = monthSel.value, y = yearSel.value;
  document.getElementById('period-label').textContent = `${months[m - 1]} ${y}`;

  const [summary, budgets] = await Promise.all([
    get(`/reports/summary?month=${m}&year=${y}`),
    get(`/budgets?month=${m}&year=${y}`),
  ]);

  if (summary?.success) {
    document.getElementById('total-income').textContent   = fmt(summary.data.total_income);
    document.getElementById('total-expenses').textContent = fmt(summary.data.total_expenses);
    const net   = summary.data.net;
    const netEl = document.getElementById('net');
    netEl.textContent = fmt(net);
    netEl.className   = 'text-3xl font-bold ' + (net >= 0 ? 'text-emerald-600' : 'text-red-600');
  }

  const grid = document.getElementById('budgets-grid');
  const none = document.getElementById('no-budgets');
  grid.innerHTML = '';

  if (budgets?.success && budgets.data.length) {
    none.classList.add('hidden');
    budgets.data.forEach(b => {
      const s = getBudgetStatus(b);
      grid.innerHTML += `
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-sm">${b.category.name}</span>
            <span class="${BADGE[s.status]}">${s.status}</span>
          </div>
          <div class="text-xs text-slate-500 mt-1">${fmt(s.spent)} of ${fmt(b.limit_amount)} (${s.pct}%)</div>
          <div class="bg-slate-200 rounded-full h-2 overflow-hidden mt-2">
            <div class="${BAR[s.status]}" style="width:${Math.min(s.pct,100)}%;"></div>
          </div>
        </div>`;
    });
  } else {
    none.classList.remove('hidden');
  }
};

monthSel.addEventListener('change', load);
yearSel.addEventListener('change', load);
load();
