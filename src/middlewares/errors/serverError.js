import { HTTP, ERR } from '../../constants/index.js';

/**
 * Server Error Handler
 * Last-resort catch-all for unhandled/unexpected errors.
 * Never exposes stack traces or internal details to the client.
 */
const handleServerError = (err) => {
  console.error('[SERVER ERROR]', err);

  return {
    status: HTTP.SERVER_ERROR,
    payload: { success: false, message: ERR.SERVER_ERROR, data: null },
    errors: null,
  };
};

export { handleServerError };
