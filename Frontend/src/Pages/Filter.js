import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl p-5  rounded-full cursor-pointer ${
          isActive ? "bg-yellow-500 text-white" : "bg-green-500 text-white "
        }`}
      >
        <CiForkAndKnife className={isActive ? "font-bold" : "font-extrabold"} />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
