/* ── Forgot password page ── */
redirectIfAuth();

document.getElementById('forgot-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn     = document.getElementById('submit-btn');
  const alertEl = document.getElementById('alert');
  const success = document.getElementById('success');
  alertEl.classList.add('hidden');
  success.classList.add('hidden');
  btn.textContent = 'Sending…';
  btn.disabled    = true;

  const res = await post('/auth/forgot-password', {
    email: document.getElementById('email').value,
  });

  btn.textContent = 'Send Reset Link';
  btn.disabled    = false;

  if (res?.success) {
    success.textContent = res.message || 'If that email exists, a reset link has been sent.';
    success.classList.remove('hidden');
    document.getElementById('forgot-form').reset();
  } else {
    alertEl.textContent = res?.message || 'Something went wrong. Please try again.';
    alertEl.classList.remove('hidden');
  }
});
