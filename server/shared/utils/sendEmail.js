import { transporter } from '../../config/nodemailer.js';

export const sendEmail = async ({ to, subject, html, text }) => {
  const info = await transporter.sendMail({
    from: 'Nikhil patel <nikhil.portfolio.249@gmail.com>',
    to,
    subject,
    text,
    html,
  });

  console.log('email sent', info);
};

const info = {
    accepted: [ 'stockch4@gmail.com' ],
    rejected: [],
    ehlo: [
      'PIPELINING',
      '8BITMIME',
      'ENHANCEDSTATUSCODES',
      'CHUNKING',
      'AUTH PLAIN LOGIN CRAM-MD5',
      'SIZE 20971520'
    ],
    envelopeTime: 125,
    messageTime: 200,
    messageSize: 316,
    response: '250 2.0.0 OK: queued as <b87a0ef7-279f-01cb-2c96-ba3253e0c942@gmail.com>',
    envelope: {
      from: 'nikhil.portfolio.249@gmail.com',
      to: [ 'stockch4@gmail.com' ]
    },
    messageId: '<b87a0ef7-279f-01cb-2c96-ba3253e0c942@gmail.com>'
  }
  