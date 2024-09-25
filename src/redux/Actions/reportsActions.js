import * as actionTypes from "../actionTypes";

export const getAdminEarnings = payload =>({
    type: actionTypes.GET_ADMIN_EARNINGS,
    payload
})

export const setAdminEarnings = payload =>({
    type: actionTypes.SET_ADMIN_EARNINGS,
    payload
})

export const getCallEarnings = payload =>({
    type: actionTypes.GET_CALL_EARNINGS,
    payload
})

export const setCallEarnings = payload =>({
    type: actionTypes.SET_CALL_EARNINGS,
    payload
})

export const getChatEarnings = payload =>({
    type: actionTypes.GET_CHAT_EARNINGS,
    payload
})

export const setChatEarnings = payload =>({
    type: actionTypes.SET_CHAT_EARNINGS,
    payload
})

export const getRecieptSummary = payload =>({
    type: actionTypes.GET_RECIEPT_SUMMARY,
    payload
})

export const setRceciptSummary = payload =>({
    type: actionTypes.SET_RECIEPT_SUMMARY,
    payload
})