import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from "./CardFeature";

const Menuslider = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const scrollIntervalRef = useRef(null);

  const scrollStep = 200; // Adjust this value to change the scrolling speed
  const scrollIntervalTime = 3000; // Adjust this value to change the interval time (in milliseconds)

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    scrollIntervalRef.current = setInterval(() => {
      slideProductRef.current.scrollLeft += scrollStep;
    }, scrollIntervalTime);
  };

  const stopAutoScroll = () => {
    clearInterval(scrollIntervalRef.current);
  };

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += scrollStep;
    stopAutoScroll();
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= scrollStep;
    stopAutoScroll();
  };

  return (
    <div>
      <div className="bg-slate-300 border">
        <div className="flex w-full items-center">
          <h2 className="font-bold capitalize  relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto text-2xl text-slate-800 mt-2 mb-2">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-hidden scrollbar-none scroll-smooth transition-all py-3 px-3"
          ref={slideProductRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((_, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Menuslider;
