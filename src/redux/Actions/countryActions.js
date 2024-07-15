import * as actionTypes from "../actionTypes";

export const getAllCountry = payload =>({
    type: actionTypes.GET_ALL_COUNTRY,
    payload
})

export const setAllCountry = payload =>({
    type: actionTypes.SET_ALL_COUNTRY,
    payload
})
