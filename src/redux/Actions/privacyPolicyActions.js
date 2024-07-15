import * as actionTypes from "../actionTypes";

export const addPrivacyPolicy = payload =>({
    type: actionTypes.CREATE_PRIVACY_POLICY,
    payload
})
export const getAllPrivacyPolicyList = () =>({
    type: actionTypes.PRIVACY_POLICY_LIST,
})
export const updatePrivacyPolicy = payload =>({
    type: actionTypes.UPDATE_PRIVACY_POLICY,
    payload
})
export const deletePrivacyPolicy = payload =>({
    type: actionTypes.DELETE_PRIVACY_POLICY,
    payload
})
export const updatePrivacyPolicyStatus = payload =>({
    type: actionTypes.UPDATE_PRIVACY_POLICY_STATUS,
    payload
})