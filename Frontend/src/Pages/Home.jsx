import React from "react";
import "../Css/Home.css";

import Homecategory from "./Homecategory";
import Footer from "./Footer";

import Menuslider from "./Menuslider";
import HomePage from "./Homepage";

const Home = () => {
  return (
    <div>
      <HomePage />
      <Homecategory />
      <Menuslider />

      <Footer />
    </div>
  );
};

export default Home;
