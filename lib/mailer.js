const sgMail = require('@sendgrid/mail');

module.exports = async function(to, subject, text, html) {
    try {        
        sgMail.setApiKey("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");
        const msg = {
          to,
          from: 'sanketh.915@gmail.com',
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
