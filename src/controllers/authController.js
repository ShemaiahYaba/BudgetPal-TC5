import { registerUser, loginUser, logoutUser, rotateTokens, forgotPasswordUser, resetPasswordUser, getMe } from '../services/authService.js';
import { sendSuccess, sendCreated } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const data = await registerUser(req.body);
  sendCreated(res, data, 'Account created successfully');
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  sendSuccess(res, data, 'Login successful');
});

export const logout = asyncHandler(async (req, res) => {
  await logoutUser(req.user.id, req.user.jti, req.user.exp);
  sendSuccess(res, null, 'Logged out successfully');
});

export const refresh = asyncHandler(async (req, res) => {
  const data = await rotateTokens(req.body.refresh_token);
  sendSuccess(res, data, 'Tokens refreshed successfully');
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await forgotPasswordUser(req.body.email);
  sendSuccess(res, null, 'If that email is registered, a reset link has been sent.');
});

export const resetPassword = asyncHandler(async (req, res) => {
  await resetPasswordUser(req.body);
  sendSuccess(res, null, 'Password reset successfully');
});

export const me = asyncHandler(async (req, res) => {
  const user = await getMe(req.user.id);
  sendSuccess(res, user, 'User profile retrieved');
});
