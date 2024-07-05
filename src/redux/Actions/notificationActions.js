import * as actionTypes from "../actionTypes";

export const sendCustomerNotification = payload =>({
    type: actionTypes.SEND_CUSTOMER_NOTIFICATIONS,
    payload
})

export const sendAstrologerNotification = payload =>({
    type: actionTypes.SEND_ASTROLOGER_NOTIFICATIONS,
    payload
})

export const getCustomerNotification = payload =>({
    type: actionTypes.GET_CUSTOMER_NOTIFICATIONS,
    payload
})

export const getAstrologerNotification = payload =>({
    type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS,
    payload




})
export const updateCustomerNotification = payload =>({
    type: actionTypes.UPDATE_CUSTOMER_NOTIFICATION,
    payload
})
export const updateAstrologerNotification = payload =>({
    type: actionTypes.UPDATE_ASTROLOGER_NOTIFICATION,
    payload
})
export const updateCustomerNotificationStatus = payload =>({
    type: actionTypes.UPDATE_CUSTOMER_NOTIFICATION_STATUS,
    payload
})
export const updateAstrologerNotificationStatus = payload =>({
    type: actionTypes.UPDATE_ASTROLOGER_NOTIFICATION_STATUS,
    payload
})
export const deleteCustomerNotification = payload =>({
    type: actionTypes.DELETE_CUSTOMER_NOTIFICATION,
    payload
})
export const deleteAstrologerNotification = payload =>({
    type: actionTypes.DELETE_ASTROLOGER_NOTIFICATION,
    payload
})

