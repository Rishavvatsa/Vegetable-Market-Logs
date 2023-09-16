import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import emptyCartImage from "../assets/catergory/empty.gif";
import "../Css/marquee.css";
import CartProduct from "../Components/CartItem";
import B1 from "../Pages/Banner/B1";
import Marquee from "react-fast-marquee";
import { clearCart } from "../utils/ProductSlice";

import { AiFillFolderAdd } from "react-icons/ai";
import { userSlice } from "../utils/userslice";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const productCartItem = useSelector((state) => state.product.cartItem);
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shipcharge, setShipCharge] = useState(0);

  useEffect(() => {
    const calculateShipping = (amount) => {
      setShipCharge(amount >= 500 ? 0 : 40);
    };

    const totalPrice = productCartItem.reduce(
      (acc, curr) => acc + parseInt(curr.total),
      0
    );

    calculateShipping(totalPrice);

    if (totalPrice < 200) {
      setDiscount(0);
    }
  }, [productCartItem]);

  const applyCoupon = () => {
    if (totalPrice < 200) {
      toast("Coupon Not Applicable for orders less than ₹200");
    } else if (coupon === "ESABJI99DEAL") {
      setDiscount(99);
      toast("⭐⭐ Congratulations ⭐⭐ You have got a discount of Rs 99");
    } else {
      toast("Coupon Not Applicable");
    }
  };

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
      const userId = user._id;
      
      console.log(userId)
      try {
        const stripePromise = await loadStripe(
          "pk_test_51NhH3zSA0NxJWLDqvIt8SneTD5023LPufXUeOrwvU5qT3ttZqqZkRn0V7kEhYzzmgCttNzN8XFAZAlE9GOjpTM7h00aSFVZVeJ"
        );
  
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productCartItem),
          }
        );
  
        if (res.status === 500) return;
  
        const data = await res.json();
  
        // Redirect to payment gateway
        toast("Redirecting to payment gateway...");
        stripePromise.redirectToCheckout({ sessionId: data }).then(result => {
          if (result.error) {
            // Handle error
            console.error("Payment error:", result.error);
          } else if (result.paymentIntent.status === "succeeded") {
           
            createOrder(userId,productCartItem);
          }
        });
      } catch (error) {
        console.error("Payment error:", error);
      }
    } else {
      toast("You are not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  
  };
  
  const createOrder = async (user,productCart) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}api/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: productCart.map((item) => ({
              user,
              productId: item._id,
              quantity: item.qty,
            })),
            totalAmount: totalPrice + shipcharge - discount,
          }),
          
        }
      );
  
      if (response.status === 201) {
        dispatch(clearCart());
        toast("Order created successfully!");
      } else {
        toast("Failed to create order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast("Error creating order.");
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
  <Link to={"/address"} > 
  <AiFillFolderAdd className="text-green-500 hover:text-purple-700 text-4xl" /> 
  </Link>
 
</div>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        <div className="marquee-container">
          <span>
            <Marquee className="text-marquee" speed={30} pauseOnHover>
            Apply Coupon Code ⭐⭐ESABJI99DEAL⭐⭐ to receive a ₹99 discount on purchases above ₹199.
            </Marquee>
          </span>
        </div>

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
              <h2 className="bg-sky-600 text-center text-white p-2 text-2xl">Summary</h2>
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
                <p>Discount:</p>
                <p className="ml-auto w-32 font-bold">
                  - <span className="text-red-500">₹</span> {discount}
                </p>
              </div>

              <div className="flex w-full py-2 text-lg border-b">
                <p>Shipping:</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {shipcharge}
                </p>
              </div>

              <div className="flex w-full py-2 text-lg border-b">
                <p>Grand Total</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span>{" "}
                  {totalPrice + shipcharge - discount}
                </p>
              </div>
              <div className="flex w-full py-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="border-2 p-1 w-full sm:w-1/2"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-500 text-white p-1 ml-2 border-2 rounded-lg"
                >
                  Apply Coupon
                </button>
              </div>
              <div className="flex w-full justify-between mt-4 gap-2">
                <button className="bg-orange-500 hover:bg-green-500 w-full  text-lg font-bold py-2 text-white" onClick={handlePayment}> 
                  Checkout
                </button>
                <button className="bg-sky-500 hover:bg-red-500 w-full  text-lg font-bold py-2 text-white" onClick={handleClear}> 
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
