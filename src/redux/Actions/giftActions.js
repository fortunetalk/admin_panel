import * as actionTypes from "../actionTypes";

export const addGift = payload =>({
    type: actionTypes.CREATE_GIFT,
    payload
})
export const getAllGifts = () =>({
    type: actionTypes.GIFT_LIST,
})
export const updateGift = payload =>({
    type: actionTypes.UPDATE_GIFT,
    payload
})
export const deleteGift = payload =>({
    type: actionTypes.DELETE_GIFT,
    payload
})
export const updateGiftStatus = payload =>({
    type: actionTypes.UPDATE_GIFT_STATUS,
    payload
})