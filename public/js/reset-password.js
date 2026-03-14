/* ── Reset password page ── */
redirectIfAuth();

// Extract token from ?token=... query param
const token = new URLSearchParams(window.location.search).get('token');
if (!token) {
  document.getElementById('alert').textContent = 'Invalid or missing reset token. Please request a new link.';
  document.getElementById('alert').classList.remove('hidden');
  document.getElementById('reset-form').style.display = 'none';
}

document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn      = document.getElementById('submit-btn');
  const alertEl  = document.getElementById('alert');
  const success  = document.getElementById('success');
  const password = document.getElementById('password').value;
  const confirm  = document.getElementById('confirm').value;

  alertEl.classList.add('hidden');
  success.classList.add('hidden');

  if (password !== confirm) {
    alertEl.textContent = 'Passwords do not match.';
    alertEl.classList.remove('hidden');
    return;
  }

  btn.textContent = 'Resetting…';
  btn.disabled    = true;

  const res = await post('/auth/reset-password', {
    token,
    new_password: password,
  });

  btn.textContent = 'Reset Password';
  btn.disabled    = false;

  if (res?.success) {
    success.textContent = 'Password reset successfully! Redirecting to login…';
    success.classList.remove('hidden');
    document.getElementById('reset-form').style.display = 'none';
    setTimeout(() => { window.location.href = '/login'; }, 2500);
  } else {
    const errs = res?.errors?.map(err => err.message).join(', ');
    alertEl.textContent = errs || res?.message || 'Reset failed. The link may have expired.';
    alertEl.classList.remove('hidden');
  }
});
