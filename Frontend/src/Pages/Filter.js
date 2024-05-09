import React from "react";
import { GiKnifeFork } from "react-icons/gi";
const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl p-5  rounded-full cursor-pointer ${
          isActive
            ? "bg-white border-2 border-black text-black"
            : "bg-black text-yellow-400 "
        }`}
      >
        <GiKnifeFork
          className={
            isActive ? "font-bold w-8 h-8 " : "font-extrabold w-8 h-8 "
          }
        />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
