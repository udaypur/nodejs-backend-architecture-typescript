import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import crypto from 'crypto';
import UserRepo from '../../../database/repository/UserRepo';
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';

import { createTokens } from '../../../auth/authUtils';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const router = express.Router();

export default router.post(
  '/basic',
  validator(schema.userCredential),
  asyncHandler(async (req, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (!user) throw new BadRequestError('User not registered');
    if (!user.password) throw new BadRequestError('Credential not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    // const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login Success', {
      user: user,
      tokens: accessTokenKey,
    }).send(res);
  }),
);
