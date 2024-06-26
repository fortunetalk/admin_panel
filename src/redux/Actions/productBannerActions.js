import * as actionTypes from "../actionTypes";

export const getProductBannerData = (payload) => ({
  type: actionTypes.GET_ALL_PRODUCT_BANNER,
  payload,
});


export const createProductBanner = payload =>({
  type: actionTypes.CREATE_PRODUCT_BANNER,
  payload
})

export const updateProductBanner = payload =>({
  type: actionTypes.UPDATE_PRODUCT_BANNER,
  payload
})
export const updateProductBannerStatus = payload =>({
  type: actionTypes.UPDATE_PRODUCT_BANNER_STATUS,
  payload
})

export const deleteProductBanner = payload =>({
  type: actionTypes.DELETE_PRODUCT_BANNER,
  payload
})
