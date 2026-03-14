/* ── Register page ── */
redirectIfAuth();

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn   = document.getElementById('submit-btn');
  const alert = document.getElementById('alert');
  alert.classList.add('hidden');
  btn.textContent = 'Creating…';
  btn.disabled = true;

  const res = await post('/auth/register', {
    name:     document.getElementById('name').value,
    email:    document.getElementById('email').value,
    password: document.getElementById('password').value,
  });

  btn.textContent = 'Create Account';
  btn.disabled = false;

  if (res && res.success) {
    saveTokens(res.data.accessToken, res.data.refreshToken);
    window.location.href = '/dashboard';
  } else {
    const errs = res?.errors?.map(e => e.message).join(', ');
    alert.textContent = errs || res?.message || 'Registration failed.';
    alert.classList.remove('hidden');
  }
});
