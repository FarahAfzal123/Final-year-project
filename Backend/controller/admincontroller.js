import user from '../models/AdminModel.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const adminuser = async (req, res) => {
  try {
    const createadminuser = new user({
      password: 'adminfyp',
    });

    const saltRounds = 10;
    let hashedpassword = await bcrypt.hash(createadminuser.password, saltRounds);
    const newadminuser = new user({
      username: 'admin',
      password: hashedpassword,
      isAdmin: true,
    })

      
    await newadminuser.save();

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
    });
  } catch (error) {
    console.error('Error creating admin user:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create admin user',
      error: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userperson = await user.findOne({ username: username});
    if(!userperson){
      res.send({
        success:false,
        message:"Invalid email or password"
      })
    }
    const matchPassword = bcrypt.compareSync(password, userperson.password);
    if (!matchPassword) {
      return res.send({
        success: false,
        message: 'Invalid email or password'
      });
    }

    else if(matchPassword) {
      const token = Jwt.sign({ userId: userperson._id }, `${process.env.JWTT}`, { expiresIn: '2h' });
    
      return res.send({
        success: true,
        message: 'admin login succesfully',
        token
        
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in email or password',
      error: error.message,
    });
  }
};

export {adminuser, Login}
