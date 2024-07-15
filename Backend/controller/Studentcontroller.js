import user from '../models/StudentModel.js';
import nodemailer from 'nodemailer';
import sendmail from './mailcontroller.js';
import bcrypt, { hash, hashSync } from 'bcrypt';
import Jwt from 'jsonwebtoken';

function generatecode() {
    const min = 1000;
    const max = 9999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code;
}


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.send({
                message: "Required Field"
            });
        }

        // Existing user
        const existuser = await user.findOne({ email: email })
        if (existuser) {
            return res.status(201).send({
                success: "false",
                message: 'Already registered Please Login'
            })
        }


        const saltRounds = 10;
        let hashedpassword = await bcrypt.hash(password, saltRounds);
        const verificationCode = generatecode();
        const saveuser = await new user({ name, email, password: hashedpassword, verificationCode }).save()

        await sendmail(verificationCode, email);


        res.status(201).send({
            success: "true",
            message: "user register",
            saveuser
        })



    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error occur"
        })
    }

}

const verifiedCode = async (req, res) => {
    try{ 
    const {email,verificationcode } = req.body;
    const emaildetect = await user.findOne({ email });
    if (!emaildetect) {
        res.send(
         { 
            success:'false',
            message: 'User not found.'
         }
        );
    }


    if(emaildetect.verificationCode !== verificationcode){
        res.send(
        { 
            success: 'false',
            message: 'Code not verified'
         }
        );
    }
    
    if(emaildetect.verificationCode === verificationcode){
        res.send(
        { 
            success: 'true',
            message: 'verification code successfully'
         }
        );
    }
}

catch{
    res.send({
        message:"invalid error"
    })
}
}

// const verifiedCode = async (req, res) => {
//     try {
//         const { email, verificationcode } = req.body;
//         const emaildetect = await user.findOne({ email });

//         if (!emaildetect) {
//             return res.send({ message: 'User not found.' });
//         }

//         if (emaildetect.verificationCode === verificationcode) {
//             return res.send({ message: 'Verification code successfully verified.' });
//         } else {
//             return res.send({ message: 'Invalid verification code.' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ message: 'Internal server error.' });
//     }
// };




const deletecall = async (req, res) => {
    try {
        const main = await user.deleteMany();
        res.status(401).send({
            success: true,
            message: "All users data now delete"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error occur"
        })

    }
}


const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const userperson = await user.findOne({ email: email })


        if (!userperson) {
            res.send({
                success: "fail",
                message: 'invalid email or password'
            })
        }


        if (userperson) {
            const matchPassword = bcrypt.compareSync(password, userperson.password);
            


            if (matchPassword) {
                const token = Jwt.sign({ userId: userperson._id }, `${process.env.JWTT}`, { expiresIn: '2h' });

                // token.save();
                if (userperson && matchPassword === true) {
                    return res.send({
                        success: "true",
                        message: "login",
                        userperson: {
                            name: userperson.name,
                            email: userperson.email,
                        },
                        token

                    })
                }


                else {
                    res.status(401).send({
                        success: "false",
                        messge: "invalid email or password",
                    })
                }
            }
            else{
                res.send({
                    message:"Password enter invalid"
                })
            }

        }
    }
    catch {
        res.status(500).send({
            success: "fail",
            message: "error in email or password"
        })
    }

}


const requireSignIn = async (req, res) => {
    try {
        res.status(200).send({ ok: true });
    }

    catch {
        console.log(error)
    }

}


const forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userdata = await user.findOne({ email: email });

        if (!userdata) {
            return res.status(401).send({
                message: "Email not Found"
            })
        }
        const token = Jwt.sign({ userId: userdata._id }, `${process.env.JWTT}`, { expiresIn: '1h' });
        // const secret = Jwt + userdata.password;
        // console.log(secret);

        // const token = Jwt.sign({ email: userdata.email, id: userdata._id }, secret, { expiresIn: '1h' });
        // const link = `http:localhost:8081/reset-password/${userdata._id}/${token}`;
        // console.log(link);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noranahmed653@gmail.com',
                pass: 'Baz@ar65',
            },
        });

        const mailOptions = {
            from: 'noranahmed653@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: http://localhost:8081/reset-password/${userdata._id}/${token}`,

        };

        console.log(`http://localhost:8081/reset-password/${userdata._id}/${token}`)

        //   console.log(text)  

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send email' });
            }

            res.json({ message: 'Email sent successfully' });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const resetpassword = async (req, res) => {

    const { Id, token } = req.params;
    const { newPassword } = req.body;

    try {
        const newuser = await user.findById(Id);

        if (!newuser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the token
        Jwt.verify(token, `${process.env.JWTT}`, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            const hashedPassword = bcrypt.hash(newPassword, 10);
            console.log(hashedPassword);
            // Update the user's password
            newuser.password = hashedPassword;
            newuser.save()


            res.json({ message: 'Password reset successful' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const Allstudents = async(req,res)=>{
    try{
        const students =  await user.find({ });
        console.log(students);
        res.send({
            success:true,
            message:"All students show here",
            students
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error occur",
            error: error.message,
        })
    }

}

export { register, login, requireSignIn, forgetpassword, resetpassword, deletecall, verifiedCode, Allstudents };
