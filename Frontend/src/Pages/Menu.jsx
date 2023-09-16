import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../Pages/Cardcontainer";
import { addCartItem } from "../utils/ProductSlice";

const Menu = () => {
  const { filterby } = useParams();
  //console.log(filterby);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  
//console.log(productDisplay.image)
  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  };
  

  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
      navigate("/cart")
  }
  
  return (
    <div className="p-2 md:p-4 relative top-20 ">
      <div className="w-full max-w-4xl m-auto md:flex bg-white border-black border-2 rounded-lg ">
        <div className="max-w-sm  overflow-hidden w-full p-5 ">
          <img src={productDisplay.image}
            
            className="hover:scale-125 transition-all h-full mix-blend-multiply" alt=""
          />
        </div>
        <div className="flex flex-col gap-2 p-5">
          <h3 className="font-serif font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
           {productDisplay.name}
          </h3>
          <p className=" text-slate-500  font-medium text-2xl"></p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500 ">₹</span>
            <span>{productDisplay.price}/kg</span>
          </p>
          <div className="flex gap-3">
          <button onClick={handleBuy} className="bg-green-800 text-white py-1 mt-2 rounded hover:bg-purple-700 min-w-[100px]">Buy</button>
          <button onClick={handleAddCartProduct} className="bg-green-500 py-1 mt-2 hover:bg-purple-700 text-white min-w-[120px] rounded-lg">Add to Basket</button>
          </div>
          
        </div>
      </div>

      <AllProduct heading={"Related Product"}  prod/>
    </div>
  );
};

export default Menu;