const mongoose = require('mongoose');
const express = require("express");
const ObjectId=require("mongodb")
const OrderItem=mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
})
exports.OrderItem=mongoose.model('Order-Item',OrderItem);