/* ── Nav: logout + active link highlighting ── */
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) {
      link.classList.add('active');
    }
  });

  // Logout
  document.getElementById('btn-logout').addEventListener('click', async () => {
    await post('/auth/logout');
    clearTokens();
    window.location.href = '/login';
  });
});
