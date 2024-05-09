import React, { useState } from "react";
import login from "../assets/catergory/signin.gif";
import i12 from "../assets/catergory/i12.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../utils/userslice";
import { toast } from "react-hot-toast";
import B1 from "../Pages/Banner/B1";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const userData = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}api/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      console.log(dataRes);

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }

      console.log(userData);
    } else {
      alert("Please Enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4 relative top-20 ">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-2  border-t-green-700 border-b-red-700 border-l-purple-600 border-r-yellow-400 border-5 rounded-2xl ">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md border-5 border-t-green-700 border-b-red-700 border-l-purple-600 border-r-yellow-400 ">
          <img src={login} alt="login" className="w-full " />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded  "
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-black-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1  w-full bg-slate-200 rounded border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account?
          <Link to={"/signup"} className="text-red-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
