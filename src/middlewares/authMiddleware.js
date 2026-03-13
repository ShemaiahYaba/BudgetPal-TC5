import jwt from 'jsonwebtoken';
import settings from '../config/settings.js';
import { HTTP, ERR } from '../constants/index.js';
import { isBlocked } from '../services/tokenBlocklist.js';

export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(HTTP.UNAUTHORIZED).json({ success: false, message: ERR.AUTH_REQUIRED, data: null });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, settings.jwt.secret);

    if (decoded.jti && isBlocked(decoded.jti)) {
      return res.status(HTTP.UNAUTHORIZED).json({ success: false, message: ERR.TOKEN_INVALID, data: null });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HTTP.UNAUTHORIZED).json({ success: false, message: ERR.TOKEN_EXPIRED, data: null });
    }
    return res.status(HTTP.UNAUTHORIZED).json({ success: false, message: ERR.TOKEN_INVALID, data: null });
  }
};
