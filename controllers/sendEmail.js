const nodeMailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")
const bodyEmail = require("./bodyEmail")
require("dotenv").config()
module.exports = function (body, req, res) {
    const transporter = nodeMailer.createTransport(sendgridTransport(
        {
            auth: {
                api_key: process.env.EMAIL_API_KEY
            }
        }
    ))

    const mail = {
        from: "tlogipaiBooksy@customer.com",
        to: "tlogipaisupremology@yahoo.com",
        subject: "Booksy Customer Email",
        html: body
    }
    transporter.sendMail(mail, (error, response) => {
        if (error) {
            console.log(error);
            req.flash("errorMessage", "failed to send email")
            res.redirect("/contact")
        }
        else {
            req.flash("successMessage", "email sent successfully")
            res.redirect("/contact")
        };
    })

}
