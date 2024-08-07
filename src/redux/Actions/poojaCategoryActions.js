import * as actionTypes from "../actionTypes";

export const setPoojaCategory = payload =>({
    type: actionTypes.CREATE_POOJA_CATEGORY,
    payload
})
export const getPoojaCategory = () => ({
    type: actionTypes.POOJA_CATEGORY_LIST,
  });
export const updatePoojaCategory = payload =>({
    type: actionTypes.UPDATE_POOJA_CATEGORY,
    payload
})
export const deletePoojaCategory = payload =>({
    type: actionTypes.DELETE_POOJA_CATEGORY,
    payload
})
export const updatePoojaCategoryStatus = payload =>({
    type: actionTypes.UPDATE_POOJA_CATEGORY_STATUS,
    payload
})