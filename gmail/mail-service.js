const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'iren171302@gmail.com',
                pass: 'cmtj vwpk yocm dvgn'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendActivationMail(email, link) {
        await this.transporter.sendMail({
            from: 'iren171302@gmail.com',
            to: email,
            subject: 'Activation link',
            text: '',
            html: `<div>
               <h1>To activate your account, please click on the link</h1>
               <a href="${link}">${link}</a>
               </div>`
        });
    }

    async sendSentTest(student,email,points){
        await this.transporter.sendMail({
            from: 'iren171302@gmail.com',
            to: email,
            subject: 'Activation link',
            text: '',
            html: `<div>
               <h1>Student ${student} passed test!</h1>
               <h2>Points: ${points}</h2>
               </div>`
        });
    }
}

module.exports = new MailService();
