import { FaPlay, FaSearch } from "react-icons/fa";
import banner from "../assets/catergory/premium_qualityMan.png";
import { useState } from "react";
//import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}`.toLowerCase() : "/search");
  };
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
      <div className="container mx-auto py-[16vh]">
        <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
          <div className="lg:w-[32rem] w-full  flex flex-col space-y-6">
            <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl">
              We are <span className="text-[#f54748]">Serious </span> For{" "}
              <span className="text-[#f54748]">Food </span>&{" "}
              <span className="text-[#549d5f]">Delivery</span>
            </div>

            <div className="lg:text-xl text-[#191919] md:text-lg text-base ">
              Best cooks and best delivery guys all at your service. Hot tasty
              food will reach you in 60 minutes.
            </div>
            <form className="flex rounded-full py-2 px-4 justify-between items-center bg-white/80 shadow-md">
              <div className="flex items-center">
                <input
                  type="text"
                  className="text-[#191919] w-full border-none bg-white  outline-none py-2 px-4  "
                  placeholder="Search food here..."
                  onChange={handleSearch}
                  value={search}
                />
              </div>
              <div className="h-10 w-10 relative bg-[#fdc55e] rounded-full ">
                <FaSearch
                  size={15}
                  className="cursor-pointer
                    text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />{" "}
              </div>
            </form>
            <div className="flex    gap-8 items-center">
              <button className="bg-red-500 hover:bg-green-600 active:scale-90 transition duration-500 transform hover:shadow-xl shadow-md rounded-full px-6 py-3 text-xl font-semibold text-white leading-tight">
                explore now
              </button>
              <div className="sm:flex hidden gap-4 items-center">
                <div className="h-14 w-14 shadow-md cursor-pointer relative bg-white rounded-full">
                  <FaPlay
                    size={20}
                    className="cursor-pointer text-[#f54748] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                  />
                </div>
                <div className="lg:text-xl text-[#191919] md:text-lg text-base cursor-pointer object cover ">
                  watch now
                </div>
              </div>
            </div>
          </div>
          <img src={banner} alt="" className="h-[28rem] mx-auto justify-end " />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
