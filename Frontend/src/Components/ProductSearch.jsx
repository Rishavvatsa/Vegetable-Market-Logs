import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardFeature from "../Pages/CardFeature";

const ProductSearch = () => {
  const location = useLocation();
  console.log(location.state);
  const [data, setData] = useState([]);
  const loadingDataSample = new Array(10).fill(null);
  const [loading, setLoading] = useState(true);

  console.log(location);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const interval = setTimeout(async () => {
      if (location.search) {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/search${location.search}`
        );
        const data = await res.json();
        setData(data);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(interval);
  }, [location.search]);

  return (
    <div className="p-2 md:p-4 relative top-20">
      <p className="text-slate-800 font-medium py-1">
        Search Results : (Showing 1 – {data?.data?.length} products )
      </p>
      <div className="gap-2 md:gap-4 flex flex-wrap justify-center">
        {!loading && location.search && data?.data[0]
          ? data.data.map((el, index) => {
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
          : loadingDataSample.map((el, index) => {
              return <CardFeature key={"ProductSearch" + index} />;
            })}
      </div>
    </div>
  );
};

export default ProductSearch;
