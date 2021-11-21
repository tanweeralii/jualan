const nodemailer = require('nodemailer')
const promisify = require('es6-promisify')

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

var send = async(options) => {
    const mailOptions = {
        from: 'Jualan <jualan@gmail.com>',
        to: options.email,
        subject: "Your OTP is "+ options.otp,
        text: options.otp
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}

module.exports = send
