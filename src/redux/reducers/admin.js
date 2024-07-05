import * as actionTypes from "../actionTypes";

const initialState = {
    loggedIn: false,
    adminInfo: null,
    loading: false,
    error: null
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                adminInfo: action.payload,
                error: null
            };
        case actionTypes.ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.ADMIN_LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.ADMIN_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                adminInfo: null,
                error: null
            };
        case actionTypes.ADMIN_LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.ADMIN_CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case actionTypes.ADMIN_CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default adminReducer;
