const sgMail = require('@sendgrid/mail');
const sendgridApiKey = "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";
sgMail.setApiKey(sendgridApiKey);

module.exports = async function(to, subject, text, html) {
    try {
        const msg = {
          to,
          from: 'donot-reply@robochat.com',
          subject,
          text,
          html
        };
        await sgMail.send(msg);
        return "Email sent successfully";
    } catch(err) {
        console.log("Error oin sending emmail: ", err);
        throw err;
    }
}
