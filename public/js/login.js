/* ── Login page ── */
redirectIfAuth();

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn   = document.getElementById('submit-btn');
  const alert = document.getElementById('alert');
  alert.classList.add('hidden');
  btn.textContent = 'Signing in…';
  btn.disabled = true;

  const res = await post('/auth/login', {
    email:    document.getElementById('email').value,
    password: document.getElementById('password').value,
  });

  btn.textContent = 'Sign In';
  btn.disabled = false;

  if (res && res.success) {
    saveTokens(res.data.accessToken, res.data.refreshToken);
    window.location.href = '/dashboard';
  } else {
    alert.textContent = res?.message || 'Login failed.';
    alert.classList.remove('hidden');
  }
});
