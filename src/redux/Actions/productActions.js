import * as actionTypes from "../actionTypes";

export const addProduct = payload =>({
    type: actionTypes.CREATE_PRODUCT,
    payload
})
export const getProduct = () =>({
    type: actionTypes.PRODUCT_LIST,
})
export const updateProduct = payload =>({
    type: actionTypes.UPDATE_PRODUCT,
    payload
})
export const deleteProduct = payload =>({
    type: actionTypes.DELETE_PRODUCT,
    payload
})
export const updateProductStatus = payload =>({
    type: actionTypes.UPDATE_PRODUCT_STATUS,
    payload
})