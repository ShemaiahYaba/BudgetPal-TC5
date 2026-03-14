/* ── Categories page ── */
requireAuth();

let editId = null;

const load = async () => {
  const res = await get('/categories');
  if (!res?.success) return;

  const incomeList  = document.getElementById('income-list');
  const expenseList = document.getElementById('expense-list');
  incomeList.innerHTML  = '';
  expenseList.innerHTML = '';

  const income  = res.data.filter(c => c.type === 'income');
  const expense = res.data.filter(c => c.type === 'expense');

  document.getElementById('income-count').textContent  = income.length;
  document.getElementById('expense-count').textContent = expense.length;
  document.getElementById('no-income').classList.toggle('hidden',  income.length > 0);
  document.getElementById('no-expense').classList.toggle('hidden', expense.length > 0);

  const renderItem = (c) => `
    <div class="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
      <span class="text-sm font-medium">${c.name}</span>
      <div class="flex gap-1.5">
        <button class="px-2.5 py-1 border border-slate-200 text-slate-500 rounded-lg text-xs bg-white hover:bg-slate-50 cursor-pointer"
          data-action="edit" data-id="${c.id}" data-name="${c.name}" data-type="${c.type}">Edit</button>
        <button class="px-2.5 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 cursor-pointer border-none"
          data-action="delete" data-id="${c.id}">Delete</button>
      </div>
    </div>`;

  income.forEach(c  => { incomeList.innerHTML  += renderItem(c); });
  expense.forEach(c => { expenseList.innerHTML += renderItem(c); });
};

const openModal = (id, name, type) => {
  editId = id || null;
  document.getElementById('modal-title').textContent = id ? 'Edit Category' : 'Add Category';
  document.getElementById('modal-alert').classList.add('hidden');
  document.getElementById('m-name').value = name || '';
  document.getElementById('m-type').value = type || 'expense';
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('m-name').focus();
};

const closeModal = () => {
  editId = null;
  document.getElementById('modal').classList.add('hidden');
};

const save = async () => {
  const alertEl = document.getElementById('modal-alert');
  alertEl.classList.add('hidden');
  const body = {
    name: document.getElementById('m-name').value.trim(),
    type: document.getElementById('m-type').value,
  };
  const res = editId
    ? await put(`/categories/${editId}`, body)
    : await post('/categories', body);
  if (res?.success) { closeModal(); load(); }
  else {
    const errs = res?.errors?.map(e => e.message).join(', ');
    alertEl.textContent = errs || res?.message || 'Failed.';
    alertEl.classList.remove('hidden');
  }
};

const removeCategory = async (id) => {
  if (!confirm('Delete this category? This will fail if it has transactions.')) return;
  const res = await del(`/categories/${id}`);
  if (res && !res.success) { alert(res.message || 'Could not delete category.'); return; }
  load();
};

document.getElementById('btn-add').addEventListener('click', () => openModal());
document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
document.getElementById('btn-modal-save').addEventListener('click', save);
document.getElementById('m-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') save(); });

['income-list', 'expense-list'].forEach(listId => {
  document.getElementById(listId).addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'edit')   openModal(btn.dataset.id, btn.dataset.name, btn.dataset.type);
    if (btn.dataset.action === 'delete') removeCategory(btn.dataset.id);
  });
});

load();
