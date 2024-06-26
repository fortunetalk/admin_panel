import * as actionTypes from "../actionTypes";

export const getPoojaBannerData = (payload) => ({
  type: actionTypes.GET_ALL_POOJA_BANNER,
  payload,
});


export const createPoojaBanner = payload =>({
  type: actionTypes.CREATE_POOJA_BANNER,
  payload
})

export const updatePoojaBanner = payload =>({
  type: actionTypes.UPDATE_POOJA_BANNER,
  payload
})
export const updatePoojaBannerStatus = payload =>({
  type: actionTypes.UPDATE_POOJA_BANNER_STATUS,
  payload
})

export const deletePoojaBanner = payload =>({
  type: actionTypes.DELETE_POOJA_BANNER,
  payload
})
