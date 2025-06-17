import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host:process.env.BREVO_SERVER_NAME ,
  port: 587,
  auth: {
    user: '8fe63c001@smtp-brevo.com',
    pass: process.env.BREVO_API_KEY,
  },
});
