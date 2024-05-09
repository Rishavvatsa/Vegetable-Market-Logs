import React from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature"; 

const WishlistPage = () => {
  const wishlistData = useSelector((state) => state.reducers);

  return (
    <div className="pt-20">
      <h2 className="font-bold capitalize text-2xl text-slate-800 mt-2 mb-4 relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">Wishlist</h2>
      {wishlistData.length === 0 ? (
        <p className="text-slate-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
      
          {wishlistData.map((product) => (
            <CardFeature
              key={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
              id={product._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
