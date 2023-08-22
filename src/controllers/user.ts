import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';
import path from 'path';

import { CreateUser } from '#/@types/user';
import User from '#/models/user';
import { MAILTRAP_PASS, MAILTRAP_USER } from '#/utils/variables';
import { generateToken } from '#/utils/helper';
import EmailVerificationToken from '#/models/emailVerificationToken';
import { generateTemplate } from '#/mail/template';


export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ name, email, password });

  // send verification email
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  const token = generateToken();
  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  const welcomeMessage = `Hi ${name}, welcome to PodBoss! Use the given OTP to verify your email.`;

  transport.sendMail({
    to: user.email,
    from: 'auth@myapp.com',
    subject: 'Welcome message',
    html: generateTemplate({
      title: 'Welcome to PodBoss',
      message: welcomeMessage,
      logo: 'cid:logo',
      banner: 'cid:welcome',
      link: '#',
      btnTitle: token,
    }),
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../mail/logo.png'),
        cid: 'logo',
      },
      {
        filename: 'welcome.png',
        path: path.join(__dirname, '../mail/welcome.png'),
        cid: 'welcome',
      },
    ],
  });

  res.status(201).json({ user });
};
