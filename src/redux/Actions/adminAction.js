import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
    type: actionTypes.SET_IS_LOADING,
    payload: true,
});

export const unsetIsLoading = () => ({
    type: actionTypes.UNSET_IS_LOADING,
    payload: false,
});


export const adminLoginRequest = (payload) => ({
    type: actionTypes.ADMIN_LOGIN_REQUEST,
    payload,
});

export const adminLoginSuccess = (payload) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    payload,
});

export const adminLoginFailure = (error) => ({
    type: actionTypes.ADMIN_LOGIN_FAILURE,
    error,
});

export const adminLogoutRequest = () => ({
    type: actionTypes.ADMIN_LOGOUT_REQUEST,
});

export const adminLogoutSuccess = () => ({
    type: actionTypes.ADMIN_LOGOUT_SUCCESS,
});

export const adminLogoutFailure = (error) => ({
    type: actionTypes.ADMIN_LOGOUT_FAILURE,
    error,
});

export const adminChangePasswordRequest = () => ({
    type: actionTypes.ADMIN_CHANGE_PASSWORD_REQUEST,
});

export const adminChangePasswordSuccess = () => ({
    type: actionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS,
});

export const adminChangePasswordFailure = (error) => ({
    type: actionTypes.ADMIN_CHANGE_PASSWORD_FAILURE,
    error,
});

export const setApiPayload = (error) => ({
    type: actionTypes.SET_API_PAYLOAD,
    error,
});


// Sub-Admin 

export const subadminAdd = (payload) => ({
    type: actionTypes.SUBADMIN_ADD,
    payload,
});
export const getAllSubadmin = (payload) => ({
    type: actionTypes.GET_ALL_SUBADMIN,
    payload,
});
export const setAllSubadmin = (payload) => ({
    type: actionTypes.SET_ALL_SUBADMIN,
    payload,
});
export const subadminDelete = (payload) => ({
    type: actionTypes.SUBADMIN_DELETE,
    payload,
});
export const subadminUpdate = (payload) => ({
    type: actionTypes.SUBADMIN_UPDATE,
    payload,
});

// SET_ADMIN_TYPE

export const setAdminType = (payload) => ({
    type: actionTypes.SET_ADMIN_TYPE,
    payload,
});