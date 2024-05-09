import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineUserCircle, HiOutlineShoppingBag } from "react-icons/hi";
import logo from "../assets/Untitled_logo_1_free-file (1).png";
import { logoutRedux } from "../utils/userslice";
import { toast } from "react-hot-toast";

const Logo = () => (
  <Link to={"/"} className="flex items-center gap-2">
    <img src={logo} className="w-10 object-cover" alt="logo" />
    <p className="hidden sm:block text-headingColor text-xl font-bold text font-serif">
      E-SABJIWALA
    </p>
  </Link>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    dispatch({ type: "LOAD_WISHLIST", payload: savedWishlist });
  }, [dispatch]);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="absolute shadow-md w-full h-16 px-2 md:px-4 z-10 bg-white drop-shadow-2xl">
      <div className="flex items-center h-full justify-between" id="nav">
        <Logo />

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={"/"} className="hover:text-green-600">
              Home
            </Link>
            <Link
              to={"menu/64db124142d6ef2654e00a12"}
              className="hover:text-green-600"
            >
              Menu
            </Link>
            <Link to={"about"} className="hover:text-green-600">
              About
            </Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <HiOutlineShoppingBag />
              <div className="absolute -top-1 -right-1 text-white bg-green-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>

          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full border-gray-600 border-2 overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" alt="" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                <Link to={"Analytics"} className="hover:hover:bg-green-300">
                  Analytics
                </Link>
                <Link to={"contact"} className="hover:bg-green-300 ">
                  Contact
                </Link>

                {userData.email === "rishavvatsa62033@gmail.com" && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2 py-1 hover:bg-green-300"
                  >
                    Add product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500 py-1"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2 py-1 hover:bg-green-300"
                  >
                    Login
                  </Link>
                )}

                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/64db13cf42d6ef2654e00a16"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"Analytics"} className="px-2 py-1">
                    Analytics
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                  {/* {userData._id !== "" && (
                    <Link to={"wishlist"} className="px-2 py-1 hover:hover:bg-blue-300 ">
                      Wishlist
                    </Link>
                  )} */}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
