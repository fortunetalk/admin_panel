import * as actionTypes from "../actionTypes";

export const addPooja = payload =>({
    type: actionTypes.CREATE_POOJA,
    payload
})
export const getPooja = () =>({
    type: actionTypes.POOJA_LIST,
})
export const updatePooja = payload =>({
    type: actionTypes.UPDATE_POOJA,
    payload
})
export const deletePooja = payload =>({
    type: actionTypes.DELETE_POOJA,
    payload
})
export const updatePoojaStatus = payload =>({
    type: actionTypes.UPDATE_POOJA_STATUS,
    payload
})