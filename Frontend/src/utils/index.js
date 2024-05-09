import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userslice"
import productSlideReducer from "./ProductSlice";
import Reducers from "./Reducer/reducers"
export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSlideReducer,
    reducers:Reducers
    
  },
});