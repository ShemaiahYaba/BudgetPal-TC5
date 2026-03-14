/* ── Budgets page ── */
requireAuth();

let editId = null;
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const now    = new Date();

const monthSel = document.getElementById('month-select');
const yearSel  = document.getElementById('year-select');

months.forEach((m, i) => {
  const o = new Option(m, i + 1);
  if (i + 1 === now.getMonth() + 1) o.selected = true;
  monthSel.appendChild(o);
  document.getElementById('m-month').appendChild(new Option(m, i + 1, false, i + 1 === now.getMonth() + 1));
});

for (let y = now.getFullYear(); y >= now.getFullYear() - 2; y--) {
  yearSel.appendChild(new Option(y, y, false, y === now.getFullYear()));
  document.getElementById('m-year').appendChild(new Option(y, y, false, y === now.getFullYear()));
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

const load = async () => {
  const m    = monthSel.value, y = yearSel.value;
  const res  = await get(`/budgets?month=${m}&year=${y}`);
  const grid = document.getElementById('budgets-grid');
  const none = document.getElementById('no-budgets');
  grid.innerHTML = '';

  if (!res?.success || !res.data.length) {
    none.classList.remove('hidden');
    return;
  }
  none.classList.add('hidden');

  res.data.forEach(b => {
    const spent     = parseFloat(b.spent ?? 0);
    const limit     = parseFloat(b.limit_amount);
    const pct       = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
    const status    = pct >= 100 ? 'exceeded' : pct >= 80 ? 'warning' : 'safe';
    const remaining = limit - spent;

    grid.innerHTML += `
      <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div class="flex justify-between items-start">
          <div>
            <div class="font-bold text-base">${b.category.name}</div>
            <div class="text-xs text-slate-500 mt-0.5">${months[b.month - 1]} ${b.year}</div>
          </div>
          <span class="${BADGE[status]}">${status}</span>
        </div>
        <div class="bg-slate-200 rounded-full h-2 overflow-hidden mt-3">
          <div class="${BAR[status]}" style="width:${pct}%;"></div>
        </div>
        <div class="flex justify-between text-sm mt-2">
          <span><strong>${fmt(spent)}</strong> <span class="text-slate-500">spent</span></span>
          <span><strong>${fmt(remaining)}</strong> <span class="text-slate-500">left of ${fmt(limit)}</span></span>
        </div>
        <div class="flex gap-2 mt-3">
          <button class="px-2.5 py-1 border border-slate-200 text-slate-500 rounded-lg text-xs bg-white hover:bg-slate-50 cursor-pointer"
            data-action="edit" data-id="${b.id}" data-limit="${b.limit_amount}">Edit Limit</button>
          <button class="px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 cursor-pointer border-none"
            data-action="delete" data-id="${b.id}">Delete</button>
        </div>
      </div>`;
  });
};

const loadExpenseCategories = async () => {
  const res = await get('/categories');
  if (!res?.success) return;
  const sel = document.getElementById('m-category');
  res.data.filter(c => c.type === 'expense').forEach(c => {
    sel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });
};

const openModal = () => {
  document.getElementById('modal-alert').classList.add('hidden');
  document.getElementById('m-limit').value = '';
  document.getElementById('modal').classList.remove('hidden');
};

const closeModal = () => document.getElementById('modal').classList.add('hidden');

const openEdit = (id, limit) => {
  editId = id;
  document.getElementById('e-limit').value = limit;
  document.getElementById('edit-alert').classList.add('hidden');
  document.getElementById('edit-modal').classList.remove('hidden');
};

const closeEditModal = () => document.getElementById('edit-modal').classList.add('hidden');

const save = async () => {
  const alertEl = document.getElementById('modal-alert');
  alertEl.classList.add('hidden');
  const res = await post('/budgets', {
    category_id:  document.getElementById('m-category').value,
    month:        parseInt(document.getElementById('m-month').value),
    year:         parseInt(document.getElementById('m-year').value),
    limit_amount: parseFloat(document.getElementById('m-limit').value),
  });
  if (res?.success) { closeModal(); load(); }
  else {
    const errs = res?.errors?.map(e => e.message).join(', ');
    alertEl.textContent = errs || res?.message || 'Failed.';
    alertEl.classList.remove('hidden');
  }
};

const saveEdit = async () => {
  const alertEl = document.getElementById('edit-alert');
  alertEl.classList.add('hidden');
  const res = await put(`/budgets/${editId}`, {
    limit_amount: parseFloat(document.getElementById('e-limit').value),
  });
  if (res?.success) { closeEditModal(); load(); }
  else {
    alertEl.textContent = res?.message || 'Failed.';
    alertEl.classList.remove('hidden');
  }
};

const removeBudget = async (id) => {
  if (!confirm('Delete this budget?')) return;
  await del(`/budgets/${id}`);
  load();
};

document.getElementById('btn-add').addEventListener('click', openModal);
document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
document.getElementById('btn-modal-save').addEventListener('click', save);
document.getElementById('btn-edit-cancel').addEventListener('click', closeEditModal);
document.getElementById('btn-edit-save').addEventListener('click', saveEdit);
monthSel.addEventListener('change', load);
yearSel.addEventListener('change', load);

document.getElementById('budgets-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  if (btn.dataset.action === 'edit')   openEdit(btn.dataset.id, btn.dataset.limit);
  if (btn.dataset.action === 'delete') removeBudget(btn.dataset.id);
});

loadExpenseCategories();
load();
