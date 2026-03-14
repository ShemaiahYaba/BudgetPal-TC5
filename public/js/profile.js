/* ── Profile page ── */
requireAuth();

// Load current user info
const loadProfile = async () => {
  const res = await get('/auth/me');
  if (!res?.success) return;
  const u = res.data;
  document.getElementById('p-name').value   = u.name || '';
  document.getElementById('p-email').value  = u.email || '';
  document.getElementById('p-joined').value = u.created_at
    ? new Date(u.created_at).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';
};

// Save name update (email is read-only)
document.getElementById('btn-save-profile').addEventListener('click', async () => {
  const alertEl  = document.getElementById('profile-alert');
  const successEl = document.getElementById('profile-success');
  alertEl.classList.add('hidden');
  successEl.classList.add('hidden');

  const name = document.getElementById('p-name').value.trim();
  if (!name) {
    alertEl.textContent = 'Name cannot be empty.';
    alertEl.classList.remove('hidden');
    return;
  }

  // Uses PUT /auth/me if available, otherwise we note it's not implemented
  // For now this endpoint doesn't exist — show a coming-soon note
  successEl.textContent = 'Profile update coming soon.';
  successEl.classList.remove('hidden');
});

// Change password — reuses forgot-password reset flow via new_password
document.getElementById('btn-save-pwd').addEventListener('click', async () => {
  const alertEl   = document.getElementById('pwd-alert');
  const successEl = document.getElementById('pwd-success');
  alertEl.classList.add('hidden');
  successEl.classList.add('hidden');

  const password = document.getElementById('p-password').value;
  const confirm  = document.getElementById('p-confirm').value;

  if (!password) {
    alertEl.textContent = 'Please enter a new password.';
    alertEl.classList.remove('hidden');
    return;
  }
  if (password.length < 8) {
    alertEl.textContent = 'Password must be at least 8 characters.';
    alertEl.classList.remove('hidden');
    return;
  }
  if (password !== confirm) {
    alertEl.textContent = 'Passwords do not match.';
    alertEl.classList.remove('hidden');
    return;
  }

  const res = await post('/auth/forgot-password', {
    email: document.getElementById('p-email').value,
  });

  if (res?.success) {
    successEl.textContent = 'A password reset link has been sent to your email.';
    successEl.classList.remove('hidden');
    document.getElementById('p-password').value = '';
    document.getElementById('p-confirm').value  = '';
  } else {
    alertEl.textContent = res?.message || 'Failed to send reset email.';
    alertEl.classList.remove('hidden');
  }
});

loadProfile();
