import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import settings from '../config/settings.js';
import { HTTP, ERR } from '../constants/index.js';
import AppError from '../middlewares/errors/appError.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from './email/index.js';
import { blockToken } from './tokenBlocklist.js';

// ─── Token helpers ────────────────────────────────────────────────────────────

const signAccessToken = (user) => {
  const jti = crypto.randomUUID();
  return jwt.sign({ id: user.id, email: user.email, jti }, settings.jwt.secret, {
    expiresIn: settings.jwt.expiresIn,
  });
};

const issueRefreshToken = async (user) => {
  const rawToken = crypto.randomBytes(64).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

  // Parse refreshExpiresIn (e.g. "7d") into a Date
  const ms = parseDuration(settings.jwt.refreshExpiresIn);
  const expires = new Date(Date.now() + ms);

  await user.update({ refresh_token: hashedToken, refresh_expires: expires });
  return rawToken;
};

const parseDuration = (str) => {
  const units = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  const match = String(str).match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 86_400_000; // default 7d
  return parseInt(match[1]) * units[match[2]];
};

const buildAuthPayload = async (user) => {
  const accessToken = signAccessToken(user);
  const refreshToken = await issueRefreshToken(user);
  return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
};

// ─── Auth operations ──────────────────────────────────────────────────────────

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new AppError(ERR.EMAIL_IN_USE, HTTP.CONFLICT);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  sendWelcomeEmail({ name: user.name, email: user.email });
  return buildAuthPayload(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) throw new AppError(ERR.INVALID_CREDENTIALS, HTTP.UNAUTHORIZED);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError(ERR.INVALID_CREDENTIALS, HTTP.UNAUTHORIZED);

  return buildAuthPayload(user);
};

export const logoutUser = async (userId, jti, exp) => {
  await User.update(
    { refresh_token: null, refresh_expires: null },
    { where: { id: userId } }
  );
  if (jti && exp) blockToken(jti, exp);
};

export const rotateTokens = async (rawRefreshToken) => {
  const hashedToken = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');

  const user = await User.scope('withPassword').findOne({ where: { refresh_token: hashedToken } });
  if (!user || !user.refresh_expires || user.refresh_expires < new Date()) {
    throw new AppError(ERR.INVALID_REFRESH_TOKEN, HTTP.UNAUTHORIZED);
  }

  // Rotate — issue fresh pair
  return buildAuthPayload(user);
};

export const forgotPasswordUser = async (email) => {
  const user = await User.scope('withPassword').findOne({ where: { email } });

  if (user) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await user.update({ reset_token: hashedToken, reset_expires: expires });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${rawToken}`;
    sendPasswordResetEmail({ name: user.name, email: user.email }, resetUrl);
  }
};

export const resetPasswordUser = async ({ token, new_password }) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.scope('withPassword').findOne({ where: { reset_token: hashedToken } });
  if (!user || !user.reset_expires || user.reset_expires < new Date()) {
    throw new AppError(ERR.INVALID_RESET_TOKEN, HTTP.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(new_password, 10);
  // Clear reset fields and any existing refresh token — forces re-login after password change
  await user.update({
    password: hashedPassword,
    reset_token: null,
    reset_expires: null,
    refresh_token: null,
    refresh_expires: null,
  });
};

export const getMe = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new AppError(ERR.NOT_FOUND, HTTP.NOT_FOUND);
  return user;
};
