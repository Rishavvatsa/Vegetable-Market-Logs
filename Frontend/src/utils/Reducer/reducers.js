import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST,LOAD_WISHLIST } from "../Action/ActionType";

const Reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      
      const updatedWishlist = [...state, action.payload];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;

    case REMOVE_FROM_WISHLIST:
      const filteredWishlist = state.filter((item, index) => index !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      return filteredWishlist;
      case LOAD_WISHLIST:
        return action.payload;
    default:
      return state;
  }
};

export default Reducers;
