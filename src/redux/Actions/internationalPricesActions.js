import * as actionTypes from "../actionTypes";


export const createInternationalPrice = payload =>({
  type: actionTypes.CREATE_INTERNATIONAL_PRICE,
  payload
})

export const getInternationalPrice = payload =>({
  type: actionTypes.GET_INTERNATIONAL_PRICE,
  payload
})

export const setInternationalPrice = payload =>({
  type: actionTypes.SET_INTERNATIONAL_PRICE,
  payload
})
export const updateInternationalPrice = payload =>({
  type: actionTypes.UPDATE_INTERNATIONAL_PRICE,
  payload
})
export const deleteInternationalPrice = payload =>({
  type: actionTypes.DELETE_INTERNATIONAL_PRICE,
  payload
})

