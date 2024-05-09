import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import emptyCartImage from "../assets/catergory/empty.gif";
import "../Css/marquee.css";
import CartProduct from "../Components/CartItem";
import B1 from "../Pages/Banner/B1";

import { clearCart } from "../utils/ProductSlice";

import { AiFillFolderAdd } from "react-icons/ai";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const productCartItem = useSelector((state) => state.product.cartItem);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        "pk_test_51NhH3zSA0NxJWLDqvIt8SneTD5023LPufXUeOrwvU5qT3ttZqqZkRn0V7kEhYzzmgCttNzN8XFAZAlE9GOjpTM7h00aSFVZVeJ"
      );
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}create-checkout-session`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productCartItem),
        }
      );
      if (res.statusCode === 500) return;

      const data = await res.json();
      console.log(data);

      toast("Redirect to payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("You have not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <B1
        heading="Add to Cart"
        bannerimage="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      />

      <div className="text-left mt-6 ">
        <p className="text-lg font-bold text-gray-600">Add Address </p>
        <Link to={"/address"}>
          <AiFillFolderAdd className="text-green-500 hover:text-purple-700 text-4xl" />
        </Link>
      </div>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex flex-col md:flex-row gap-3">
            {/* display cart items */}
            <div className="w-full md:max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            <div className="w-full md:max-w-md md:ml-auto ">
              <h2 className="bg-red-600 text-center text-white p-2 text-2xl">
                Summary
              </h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Quantity :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>

              <div className="flex w-full py-2 text-lg border-b">
                <p>Sub-Total</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>

              <div className="flex w-full py-2 text-lg border-b">
                <p>Grand Total</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>

              <div className="flex w-full justify-between mt-4 gap-2">
                <button
                  className="bg-orange-500 hover:bg-green-500 w-full  text-lg font-bold py-2 text-white"
                  onClick={handlePayment}
                >
                  Checkout
                </button>
                <button
                  className="bg-sky-500 hover:bg-red-500 w-full  text-lg font-bold py-2 text-white"
                  onClick={handleClear}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" alt="" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;