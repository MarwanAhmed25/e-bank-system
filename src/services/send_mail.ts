import nodemailer from 'nodemailer';
import config from '../config/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user_email,
    pass: config.password_email,
  },
});

function sending_mail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: config.user_email,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return 'check your email.';
    }
  });
}

export default sending_mail;
