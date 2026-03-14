/* ── BudgetPal shared API helpers ── */
const API = '/api/v1';

const getAccess  = () => localStorage.getItem('bp_access');
const getRefresh = () => localStorage.getItem('bp_refresh');

const saveTokens = (access, refresh) => {
  localStorage.setItem('bp_access', access);
  localStorage.setItem('bp_refresh', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('bp_access');
  localStorage.removeItem('bp_refresh');
};

const requireAuth = () => {
  if (!getAccess()) window.location.href = '/login';
};

const redirectIfAuth = () => {
  if (getAccess()) window.location.href = '/dashboard';
};

const apiFetch = async (method, path, body, retry = true) => {
  const res = await fetch(API + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getAccess() ? { Authorization: `Bearer ${getAccess()}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && retry) {
    const rt = getRefresh();
    if (rt) {
      const rr = await fetch(API + '/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: rt }),
      });
      if (rr.ok) {
        const rd = await rr.json();
        saveTokens(rd.data.accessToken, rd.data.refreshToken);
        return apiFetch(method, path, body, false);
      }
    }
    clearTokens();
    window.location.href = '/login';
    return null;
  }

  return res.json();
};

const get  = (p)    => apiFetch('GET',    p);
const post = (p, b) => apiFetch('POST',   p, b);
const put  = (p, b) => apiFetch('PUT',    p, b);
const del  = (p)    => apiFetch('DELETE', p);

const fmt = (n) => '$' + Number(n).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
