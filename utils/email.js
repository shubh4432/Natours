const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text')

//new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `shubham verma <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if(process.env.NODE_ENV === 'production'){
      //sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_USERNAME
        }
      })
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  // send the actual email
  async send(template, subject) {
    // 1) render html for the email based on apug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });
    
    //2) define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
      // html:
    };

    //3) Create a transport and send the email
    
    await this.newTransport().sendMail(mailOptions);
  }
    async sendWelcome()  {
     await this.send('welcome', 'Welcome to the natours family')
    }

    async sendPasswordRest() {
      await this.send('passwordReset',
       'Your password reset token(valid for only 10 mins')
    }
};


