import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from '../constans/index.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);
  return User.create(payload);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
};
