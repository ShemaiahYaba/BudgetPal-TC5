/**
 * In-memory JTI blocklist for invalidated access tokens.
 * Entries are bounded by the access token TTL (15 min default),
 * so the set stays small and self-cleans automatically.
 */
const blocklist = new Map(); // jti → exp (unix seconds)

export const blockToken = (jti, exp) => {
  blocklist.set(jti, exp);
};

export const isBlocked = (jti) => blocklist.has(jti);

// Remove entries whose access token has already expired naturally
const pruneExpired = () => {
  const now = Math.floor(Date.now() / 1000);
  for (const [jti, exp] of blocklist) {
    if (exp < now) blocklist.delete(jti);
  }
};

setInterval(pruneExpired, 5 * 60 * 1000); // prune every 5 minutes
