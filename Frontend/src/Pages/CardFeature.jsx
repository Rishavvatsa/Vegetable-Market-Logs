import React,{useState}from 'react'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../Css/Product.css"

import {addCartItem,increaseQty} from "../utils/ProductSlice"
const CardFeature = ({ image, name, price, category, loading, id }) => {
    const dispatch=useDispatch();
   
    const handleAddCartProduct = (e) => {
        dispatch(addCartItem({
          _id : id,
          name : name,
          price : price,
          category : category,
          image : image
        }))
      };
  return (
    <div className="w-full min-w-[250px] max-w-[300px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 border border-gray-400 hover:border-gray-300 hover:scale-105 transition-transform  relative cursor-pointer flex flex-col rounded-lg ">
    {image ? (
      <>
        <Link
          to={`/menu/${id}`}
          onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
        >
          <div className="h-28  flex flex-col justify-center items-center border-none">
            <img src={image} className="h-full object-contain transform transition duration-500 hover:scale-150 mix-blend-multiply" alt=""  />
          </div>
          <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className=" text-slate-500  font-medium ">{category}</p>
          <p className=" font-bold">
            <span className="text-red-500">₹</span>
            <span>{price}/kg</span>
          </p>
        </Link>
        <button
            className="bg-green-600 hover:bg-green-500 text-white py-1 px-6 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transform hover:scale-105 transition-transform w-full flex items-center justify-center space-x-2 mt-2"
            onClick={handleAddCartProduct} 
          >
            Add to Basket
          </button>
        
        
      </>
    ) : (
      <div className="min-h-[150px] flex justify-center items-center">
        <p>{loading}</p>
      </div>
    )}
  </div>
);
}

export default CardFeature
