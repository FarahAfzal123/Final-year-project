import nodemailer from 'nodemailer'
import HTML_TEMPLATE from '../Mail template/mailtemplate.js'

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "ranabrand532@gmail.com",
        pass: "mzcx hmlm tmtz beys",
    },
});



const sendmail = async (message, usermail) => {
    try {
        const info = await transporter.sendMail({
            from: "<webapp@gmail.com>",
            to: `${usermail}`, 
            subject: "Node JS Mail", 
            text: `${message}`,
            html: HTML_TEMPLATE(message),
        })
    } catch (error) {
        console.log(error);
    }
};


export default sendmail;