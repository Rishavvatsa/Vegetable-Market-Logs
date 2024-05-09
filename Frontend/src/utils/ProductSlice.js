import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  searchProductLoading: false,
  cartItem: JSON.parse(localStorage.getItem("cart")) || [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    handleSearchProductLoading: (state, action) => {
      state.searchProductLoading = action.payload;
    },
    addCartItem: (state, action) => {
      const { cartItem } = state;
      const check = cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = action.payload.price;
        const newCartItem = [
          ...cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        state.cartItem = newCartItem;
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
      toast.error("Cart Cleared");
    },
    deleteCartItem: (state, action) => {
      toast("one Item Delete");
      const newCartItem = state.cartItem.filter(
        (item) => item._id !== action.payload
      );
      state.cartItem = newCartItem;
    },
    increaseQty: (state, action) => {
      const { cartItem } = state;
      const index = cartItem.findIndex((el) => el._id === action.payload);
      const qty = cartItem[index].qty + 1;
      const price = cartItem[index].price;
      const total = price * qty;
      cartItem[index].qty = qty;
      cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const { cartItem } = state;
      const index = cartItem.findIndex((el) => el._id === action.payload);
      if (cartItem[index].qty > 1) {
        const qty = cartItem[index].qty - 1;
        const price = cartItem[index].price;
        const total = price * qty;
        cartItem[index].qty = qty;
        cartItem[index].total = total;
      }
    },
  },
  extraReducers: (builder) => {
    // Add logic to persist cart state to localStorage for all actions
    builder.addMatcher(
      (action) =>
        action.type.startsWith("product/") && action.type !== "product/setDataProduct",
      (state) => {
        localStorage.setItem("cart", JSON.stringify(state.cartItem));
      }
    );
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  clearCart,
  handleSearchProductLoading,
} = productSlice.actions;

export default productSlice.reducer;
