const ProductModel = require("../models/ProductModel");
const productModel=require("../models/ProductModel")
const mongoose=require("mongoose");
exports.createProduct=async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
};
exports.Product=async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
  }
  
    