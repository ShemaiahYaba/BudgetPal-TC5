import { registerUser, loginUser, forgotPasswordUser, resetPasswordUser, getMe } from '../services/authService.js';
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

export const logout = (_req, res) => {
  sendSuccess(res, null, 'Logged out successfully');
};

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
