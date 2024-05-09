import { ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST } from "./ActionType"
export const add_to_wishlist=data=>({
    type:ADD_TO_WISHLIST,
    payload:data
})
export const remove_from_wishlist=data=>({
    type:REMOVE_FROM_WISHLIST,
    payload:data
})
