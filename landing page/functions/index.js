const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
        user: "apikey",
        pass: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
});

exports.sendEmail = functions.https.onRequest((request, response) => {
    const email_from = request.query.email_from;
    const message = request.query.message;

    const mailOptions = {
        from: 'Ibby @ FinTalk <ibrahim.nawaz1@icloud.com>',
        to: 'ibrahim.nawaz1@icloud.com',
        subject: 'FinTalk contact form submission',
        html: `${message} <br><br> From ${email_from}`
    }


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`ERROR: (email) ${email_from} --- (message) ${message} --- (error) ${error.toString()}`);
            response.send(error.toString());
        }
        response.send("Your message was sent successfully")
    });
})