import * as actionTypes from "../actionTypes";

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
