import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./Filter";
import loading from "../assets/preloader.gif";
const Cardcontainer = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredProducts = dataFilter.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className=" text-2xl  mb-4  font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
        {heading}
      </h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>
              <img src={loading} alt="...loading" />
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "all product"} />
            ))}
      </div>
    </div>
  );
};

export default Cardcontainer;
