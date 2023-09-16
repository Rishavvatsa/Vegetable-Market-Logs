const  userModel=require("../models/usermodel");


exports.register=async (req, res) => {
    const { email, role } = req.body;
  
    userModel
      .findOne({ email: email })
      .then((result) => {
        if (result) {
          res.send({ message: 'Email id is already registered', alert: false });
        } else {
          const data = new userModel({
            ...req.body,
            role: role || "user", // Assign the role if provided, otherwise default to "user"
          });
          return data.save();
        }
      })
      .then(() => {
        res.send({ message: 'Successfully signed up', alert: true });
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: 'Error occurred', alert: false });
      });
  };
  exports.login=async(req, res) => {
  
    const { email } = req.body;
  
    // Find a user with the provided email in the userModel collection
    userModel.findOne({ email: email })
      .then((result) => {
        if (result) {
          // If a user is found, create a data object with selected fields
          const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            password:result.password,
            image:result.image
          };
  
          // Log the data and send a success response
          console.log(dataSend);
          res.send({
            message: 'Login is successful',
            alert: true,
            data: dataSend,
          });
        } else {
          // If no user is found, send a message indicating that the email is not available
          res.send({
            message: 'Email is not available, please sign up',
            alert: false,
          });
        }
      })
      .catch((err) => {
        // Handle errors and send an error response
        console.log(err);
        res.send({
          message: 'Error occurred during login',
          alert: false,
        });
      });
  };
  exports.getUserById = async (req, res, next, id) => {
    try {
      const user = await userModel.findById({ _id: id });
      
      next();
    } catch (error) {
      return res.status(400).json({
        message: "User by this id not found in the DB",
      });
    }
  };
  