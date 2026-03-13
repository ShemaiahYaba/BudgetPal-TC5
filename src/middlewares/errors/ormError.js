import { HTTP, ERR } from '../../constants/index.js';

/**
 * ORM Error Handler (Sequelize)
 * Intercepts database-level errors and maps them to clean HTTP responses.
 */

const ORM_ERROR_MAP = {
  SequelizeValidationError: {
    status: HTTP.BAD_REQUEST,
    message: ERR.VALIDATION_FAILED,
    extractErrors: (err) =>
      err.errors.map((e) => ({ field: e.path, message: e.message })),
  },
  SequelizeUniqueConstraintError: {
    status: HTTP.CONFLICT,
    message: ERR.DUPLICATE,
    extractErrors: null,
  },
  SequelizeForeignKeyConstraintError: {
    status: HTTP.BAD_REQUEST,
    message: 'Referenced record does not exist.',
    extractErrors: null,
  },
  SequelizeConnectionError: {
    status: HTTP.SERVER_ERROR,
    message: ERR.SERVER_ERROR,
    extractErrors: null,
  },
  SequelizeDatabaseError: {
    status: HTTP.SERVER_ERROR,
    message: ERR.SERVER_ERROR,
    extractErrors: null,
  },
};

const isOrmError = (err) => err.name in ORM_ERROR_MAP;

const handleOrmError = (err) => {
  const mapped = ORM_ERROR_MAP[err.name];
  return {
    status: mapped.status,
    payload: { success: false, message: mapped.message, data: null },
    errors: mapped.extractErrors ? mapped.extractErrors(err) : null,
  };
};

export { isOrmError, handleOrmError };
