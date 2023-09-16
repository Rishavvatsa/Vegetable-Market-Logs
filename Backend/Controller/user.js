const userModel = require("../models/usermodel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth=require("../middleware/auth")
exports.register = async (req, res) => {
    const { email, role, password, firstName, lastName, image } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
     
      if (existingUser) {
        return res.status(409).json({message:"User already Exist"})
      }
  
      const saltRounds = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance with the provided data
      const newUser = new userModel({
        email,
        role: role || "user",
        password: hashedPassword, 
        firstName,
        lastName,    
        image
      });
  
      // Save the new user instance to the database
      await newUser.save();
      res.status(201).json({
        message:"User registered successfully"
      })
  
    
    } catch (err) {
      console.error(err);
      res.status(500).json({message:err.message});
    }
  };
  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({message:"User not found,Please Signup"})
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch)
      if (!passwordMatch) {
        return res.status(401).json({message:"Invalid credentials"})
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
        expiresIn:'2h'
      }); 
  
      const dataSend = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        password:user.password
      };
  
      res.send({
        message: 'Login is successful',
        alert: true,
        data: dataSend,
        token: token, // Send the JWT token to the client
      });
    } catch (err) {
      console.error(err);
      res.send({
        message: 'Error occurred during login',
        alert: false,
      });
    }
  };
  exports.getUserById = async (req, res) => {
    const { userId } = req.params; 
  console.log(userId)
    try {
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
  