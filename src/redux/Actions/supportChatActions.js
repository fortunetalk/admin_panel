import * as actionTypes from '../actionTypes'

export const getSupportChatMessageData = payload =>({
    type: actionTypes.GET_SUPPORT_CHAT_MESSAGES_DATA,
    payload
})

export const setSupportChatMessageData = payload => ({
    type: actionTypes.SET_SUPPORT_CHAT_MESSAGES_DATA,
    payload
})

export const setMicVisible = payload => ({
    type: actionTypes.SET_MIC_VISIBLE,
    payload
})

export const sendSupportChatMessage = payload => ({
    type: actionTypes.SEND_SUPPORT_CHAT_MESSAGE,
    payload
})

export const setSupportChatMessageValue = payload => ({
    type: actionTypes.SET_SUPPORT_CHAT_MESSAGE_VALUE,
    payload
})

export const getSupportChatCustomerList = payload => ({
    type: actionTypes.GET_SUPPORT_CUSTOMER_LIST,
    payload
})

export const setSupportChatCustomerList = payload => ({
    type: actionTypes.SET_SUPPORT_CUSTOMER_LIST,
    payload
})

export const setCurrentCustomerSupport = payload => ({
    type: actionTypes.SET_CURRENT_CUSTOMER_SUPPORT,
    payload
})