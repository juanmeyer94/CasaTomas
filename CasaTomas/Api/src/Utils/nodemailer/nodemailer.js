// config/nodemailer.js

import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.ENV_MAIL, 
    pass: process.env.ENV_NOD
  },
  tls: {
    rejectUnauthorized: false
}
});

export default transporter;
