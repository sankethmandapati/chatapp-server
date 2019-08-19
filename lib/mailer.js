const nodemailer = require('nodemailer');

module.exports = async function(to, subject, text, html) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sanketh.915@gmail.com',
                pass: 'sadfasdg'
            }
        });

        const msg = {
          to,
          from: '"RoboChat" donot-reply@robochat.com',
          subject,
          text,
          html
        };
        await transporter.sendMail(msg);
        return "Email sent successfully";
    } catch(err) {
        console.log("Error oin sending emmail: ", err);
        throw err;
    }
}
