import * as actionTypes from "../actionTypes";

export const getChatHistory = payload =>({
    type: actionTypes.GET_CHAT_HISTORY,
    payload
})

export const setChatHistory = payload =>({
    type: actionTypes.SET_CHAT_HISTORY,
    payload
})

export const getChatSummary = payload =>({
    type: actionTypes.GET_CHAT_SUMMARY,
    payload
})

export const setChatSummary = payload =>({
    type: actionTypes.SET_CHAT_SUMMARY,
    payload
})

export const getCallHistory = payload =>({
    type: actionTypes.GET_CALL_HISTORY,
    payload
})

export const setCallHistory = payload =>({
    type: actionTypes.SET_CALL_HISTORY,
    payload
})

export const setCustomerFirebaseId = payload =>({
    type: actionTypes.SET_CUSTOMER_FIREBASE_ID,
    payload
})