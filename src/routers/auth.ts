import { Router } from 'express';

import {
  create,
  sendReVerificationToken,
  verifyEmail,
  generateForgetPasswordLink,
  isValidPassResetToken,
} from '#/controllers/user';
import { validate } from '#/middleware/validator';
import { CreateUserSchema, EmailVerificationBody } from '#/utils/validationSchema';



const router = Router();

router.post('/create', validate(CreateUserSchema), create);
router.post('/verify-email', validate(EmailVerificationBody), verifyEmail);
router.post('/re-verify-email', sendReVerificationToken);
router.post('/forget-password', generateForgetPasswordLink);
router.post('/verify-pass-reset-token', isValidPassResetToken);

export default router;
