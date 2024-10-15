import * as actionTypes from "../actionTypes";

export const getEcommerceBannerData = (payload) => ({
  type: actionTypes.GET_ALL_ECOMMERCE_BANNER,
  payload,
});


export const createEcommerceBanner = payload =>({
  type: actionTypes.CREATE_ECOMMERCE_BANNER,
  payload
})

export const updateEcommerceBanner = payload =>({
  type: actionTypes.UPDATE_ECOMMERCE_BANNER,
  payload
})
export const updateEcommerceBannerStatus = payload =>({
  type: actionTypes.UPDATE_ECOMMERCE_BANNER_STATUS,
  payload
})

export const deleteEcommerceBanner = payload =>({
  type: actionTypes.DELETE_ECOMMERCE_BANNER,
  payload
})
