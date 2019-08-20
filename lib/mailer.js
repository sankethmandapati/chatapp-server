const sgMail = require('@sendgrid/mail');
// const nodemailer = require('nodemailer');

sgMail.setApiKey("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");

module.exports = async function(to, subject, text, html) {
    try {
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'sanketh.915@gmail.com',
        //         pass: 'sadfasdg'
        //     }
        // });

        const msg = {
          to,
          from: '"RoboChat" sanketh.915@gmail.com',
          subject,
          text,
          html
        };
        // await transporter.sendMail(msg);

        await sgMail.send(msg);

        return "Email sent successfully";
    } catch(err) {
        console.log("Error oin sending emmail: ", err);
        throw err;
    }
}
