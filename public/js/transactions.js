/* ── Transactions page ── */
requireAuth();

let editId     = null;
let categories = [];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;');

const BADGE = {
  income:  'inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800',
  expense: 'inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800',
};

const load = async () => {
  const type  = document.getElementById('f-type').value;
  const cat   = document.getElementById('f-category').value;
  const start = document.getElementById('f-start').value;
  const end   = document.getElementById('f-end').value;

  let qs = '';
  if (type)  qs += `&type=${type}`;
  if (cat)   qs += `&category_id=${cat}`;
  if (start) qs += `&start_date=${start}`;
  if (end)   qs += `&end_date=${end}`;

  const res  = await get(`/transactions?${qs.slice(1)}`);
  const body = document.getElementById('tx-body');
  const none = document.getElementById('no-tx');
  body.innerHTML = '';

  if (!res?.success || !res.data.length) {
    none.classList.remove('hidden');
    return;
  }
  none.classList.add('hidden');

  res.data.forEach(tx => {
    const amtClass = tx.type === 'income' ? 'text-right text-emerald-600 font-semibold' : 'text-right text-red-600 font-semibold';
    body.innerHTML += `<tr>
      <td class="px-4 py-3 border-b border-slate-100 text-sm">${tx.date}</td>
      <td class="px-4 py-3 border-b border-slate-100 text-sm">${tx.category?.name ?? '—'}</td>
      <td class="px-4 py-3 border-b border-slate-100"><span class="${BADGE[tx.type]}">${tx.type}</span></td>
      <td class="px-4 py-3 border-b border-slate-100 text-sm text-slate-500">${tx.description ?? '—'}</td>
      <td class="px-4 py-3 border-b border-slate-100 ${amtClass}">${fmt(tx.amount)}</td>
      <td class="px-4 py-3 border-b border-slate-100 text-right whitespace-nowrap">
        <button class="px-2.5 py-1 border border-slate-200 text-slate-500 rounded-lg text-xs bg-white hover:bg-slate-50 cursor-pointer"
          data-action="edit"
          data-id="${tx.id}" data-category="${tx.category_id}" data-type="${tx.type}"
          data-amount="${tx.amount}" data-date="${tx.date}" data-desc="${esc(tx.description || '')}">Edit</button>
        <button class="ml-1 px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 cursor-pointer border-none"
          data-action="delete" data-id="${tx.id}">Del</button>
      </td>
    </tr>`;
  });
};

const loadCategories = async () => {
  const res = await get('/categories');
  if (!res?.success) return;
  categories = res.data;
  const fCat = document.getElementById('f-category');
  const mCat = document.getElementById('m-category');
  categories.forEach(c => {
    fCat.innerHTML += `<option value="${c.id}">${c.name} (${c.type})</option>`;
    mCat.innerHTML += `<option value="${c.id}">${c.name} (${c.type})</option>`;
  });
};

const openModal = (id) => {
  editId = id || null;
  document.getElementById('modal-title').textContent = id ? 'Edit Transaction' : 'Add Transaction';
  document.getElementById('modal-alert').classList.add('hidden');
  if (!id) {
    document.getElementById('m-amount').value = '';
    document.getElementById('m-date').value   = new Date().toISOString().split('T')[0];
    document.getElementById('m-desc').value   = '';
  }
  document.getElementById('modal').classList.remove('hidden');
};

const closeModal = () => document.getElementById('modal').classList.add('hidden');

const editTx = (id, catId, type, amount, date, desc) => {
  document.getElementById('m-category').value = catId;
  document.getElementById('m-type').value     = type;
  document.getElementById('m-amount').value   = amount;
  document.getElementById('m-date').value     = date;
  document.getElementById('m-desc').value     = desc;
  openModal(id);
};

const save = async () => {
  const alertEl = document.getElementById('modal-alert');
  alertEl.classList.add('hidden');
  const body = {
    category_id: document.getElementById('m-category').value,
    type:        document.getElementById('m-type').value,
    amount:      parseFloat(document.getElementById('m-amount').value),
    date:        document.getElementById('m-date').value,
    description: document.getElementById('m-desc').value || undefined,
  };
  const res = editId
    ? await put(`/transactions/${editId}`, body)
    : await post('/transactions', body);
  if (res?.success) { closeModal(); load(); }
  else {
    const errs = res?.errors?.map(e => e.message).join(', ');
    alertEl.textContent = errs || res?.message || 'Failed.';
    alertEl.classList.remove('hidden');
  }
};

const removeTx = async (id) => {
  if (!confirm('Delete this transaction?')) return;
  await del(`/transactions/${id}`);
  load();
};

const clearFilters = () => {
  ['f-type', 'f-start', 'f-end'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-category').value = '';
  load();
};

document.getElementById('btn-add').addEventListener('click', () => openModal());
document.getElementById('btn-filter').addEventListener('click', load);
document.getElementById('btn-clear').addEventListener('click', clearFilters);
document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
document.getElementById('m-save').addEventListener('click', save);

document.getElementById('tx-body').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  if (btn.dataset.action === 'edit') {
    editTx(btn.dataset.id, btn.dataset.category, btn.dataset.type,
      btn.dataset.amount, btn.dataset.date, btn.dataset.desc);
  } else if (btn.dataset.action === 'delete') {
    removeTx(btn.dataset.id);
  }
});

loadCategories();
load();
