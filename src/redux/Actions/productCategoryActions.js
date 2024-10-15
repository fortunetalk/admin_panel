import * as actionTypes from "../actionTypes";

export const setProductCategory = payload =>({
    type: actionTypes.CREATE_PRODUCT_CATEGORY,
    payload
})
export const getProductCategory = () =>({
    type: actionTypes.PRODUCT_CATEGORY_LIST,
})
export const updateProductCategory = payload =>({
    type: actionTypes.UPDATE_PRODUCT_CATEGORY,
    payload
})
export const deleteProductCategory = payload =>({
    type: actionTypes.DELETE_PRODUCT_CATEGORY,
    payload
})
export const updateProductCategoryStatus = payload =>({
    type: actionTypes.UPDATE_PRODUCT_CATEGORY_STATUS,
    payload
})