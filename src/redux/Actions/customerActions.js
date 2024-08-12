import * as actionTypes from "../actionTypes";

export const getAllCustomer = payload =>({
    type: actionTypes.GET_ALL_CUSTOMER,
    payload
})

export const addCustomer = payload =>({
    type: actionTypes.ADD_CUSTOMER,
    payload
})
export const setAllCustomer = payload =>({
    type: actionTypes.SET_ALL_CUSTOMER,
    payload
})

export const banCustomer = payload =>({
    type: actionTypes.BAN_CUSTOMER,
    payload
})

export const updateCustomer = payload =>({
    type: actionTypes.UPDATE_CUSTOMER,
    payload
})
export const deleteCustomer = payload =>({
    type: actionTypes.DELETE_CUSTOMER,
    payload
})
export const addRechargeByAdmin = payload =>({
    type: actionTypes.ADD_RECHARGE_BY_ADMIN,
    payload
})
export const getCustomerRechargeHistory = payload =>({
    type: actionTypes.CUSTOMER_RECHARGE_HISTORY_LIST,
    payload
})