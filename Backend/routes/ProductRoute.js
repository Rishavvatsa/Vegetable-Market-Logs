const express=require("express");
const ProductController=require("../Controller/ProductController");
const router = express.Router();
router.route("/uploadProduct").post(ProductController.createProduct);
router.route("/products").get(ProductController.Product);

module.exports = router;