import React from "react";
import "../Css/homecategory.css";
import i1 from "../assets/catergory/hand-soap.png";
import i2 from "../assets/catergory/free.png";
import i3 from "../assets/catergory/grocery.png";
import i4 from "../assets/catergory/26210-removebg-preview.png";
const Homecategory = () => {
  return (
    <div className="homecategory">
      <div className="container">
        <img src={i1} alt="" />
        <div className="content">
          <h1>Vegetables at your door step</h1>
          <p>Shop Vegetables now</p>
        </div>
      </div>
      <div className="container">
        <img src={i2} alt="img3" />
        <div className="content">
          <h1>Vegetables at your door step</h1>
          <p>Shop Vegetables now</p>
        </div>
      </div>
      <div className="container">
        <img src={i3} alt="i3" />
        <div className="content">
          <h1>Vegetables at your door step</h1>
          <p>Shop Vegetables now</p>
        </div>
      </div>
      <div className="container">
        <img src={i4} alt="img3" />
        <div className="content">
          <h1>Vegetables at your door step</h1>
          <p>Shop Vegetables now</p>
        </div>
      </div>
    </div>
  );
};

export default Homecategory;
