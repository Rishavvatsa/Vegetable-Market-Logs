const express = require("express");
const userController = require("../Controller/user"); // Make sure the import path is correct
const router = express.Router();
const authorization=require("../middleware/auth")
const searchProduct=require("../Controller/Search")
const User=require("../models/usermodel")
router.route("/signup").post(userController.register); // Use the correct function name
router.route("/login").post(userController.login);
router.get("/search",searchProduct)
router.get("/users/:userId",userController.getUserById);
//router.post('/verify', authorization.auth, userController.verifyUser);
router.get('/me',authorization.auth,async(req,res)=>{
    const {id}=req.body;
    const user=await User.findById(id);
    res.status(200).json({user});
} )
module.exports = router;
