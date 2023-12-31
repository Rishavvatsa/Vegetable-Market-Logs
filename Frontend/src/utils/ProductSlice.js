import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  searchProductLoading : false,
  cartItem: JSON.parse(localStorage.getItem("cart")) || [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    handleSearchProductLoading : (state,action)=>{
        state.searchProductLoading = action.payload
  },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        localStorage.setItem("cart", JSON.stringify(state.cartItem));
      }
    },
    clearCart: (state,action) => {
      state.cartItem=[];
      localStorage.setItem("cartItem",JSON.stringify(state.cartItem));
      toast.error("Cart Cleared")
    },
    
    deleteCartItem: (state, action) => {
      toast("one Item Delete");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
   addCartItemWithUserId :(product, userId) => async (dispatch) => {
         dispatch(addCartItem({ ...product, userId }));
  },
  }
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
  addCartItemWithUserId,
  handleSearchProductLoading
} = productSlice.actions;

export default productSlice.reducer;