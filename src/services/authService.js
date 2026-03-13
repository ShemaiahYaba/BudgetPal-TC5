import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import settings from '../config/settings.js';
import { ERR } from '../constants/index.js';
import AppError from '../middlewares/errors/appError.js';
import { HTTP } from '../constants/index.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from './email/index.js';

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, settings.jwt.secret, {
    expiresIn: settings.jwt.expiresIn,
  });

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new AppError(ERR.EMAIL_IN_USE, HTTP.CONFLICT);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = signToken(user);
  sendWelcomeEmail({ name: user.name, email: user.email });

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) throw new AppError(ERR.INVALID_CREDENTIALS, HTTP.UNAUTHORIZED);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError(ERR.INVALID_CREDENTIALS, HTTP.UNAUTHORIZED);

  const token = signToken(user);
  return { token, user: { id: user.id, name: user.name, email: user.email } };
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
  await user.update({ password: hashedPassword, reset_token: null, reset_expires: null });
};

export const getMe = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new AppError(ERR.NOT_FOUND, HTTP.NOT_FOUND);
  return user;
};
