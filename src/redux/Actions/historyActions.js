import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
    type: actionTypes.SET_IS_LOADING,
    payload: true,
});

export const unsetIsLoading = () => ({
    type: actionTypes.UNSET_IS_LOADING,
    payload: false,
});

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
export const getRechargeHistory = payload =>({
    type: actionTypes.GET_RECHARGE_HISTORY,
    payload
})

export const setRechargeHistory = payload =>({
    type: actionTypes.SET_RECHARGE_HISTORY,
    payload
})

export const setCustomerFirebaseId = payload =>({
    type: actionTypes.SET_CUSTOMER_FIREBASE_ID,
    payload
})