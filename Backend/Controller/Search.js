const ProductModel = require("../models/ProductModel");
module.exports = searchProduct = async(req,res)=>{
  
    const query = req.query.q
    const regex = new RegExp(query,"i","g")

    const data = await ProductModel.find({"$or" : [
        {"name" : regex },
         {"price" : regex },
        {"category" : regex }
    ]})
    if(data.length){
        res.send({message : "Search Results", data,alert : "success"})
    }
    else{
        res.send({message : "No Search Results", data,alert : "success"})
    }
    

}