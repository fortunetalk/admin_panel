import * as actionTypes from "../actionTypes";

const initialState = {
    adminData: null,
    adminType: null,
    isLoading: false,
    error: null,
    apiPayload: null,
    adminListData: null,
    subAdminByIdData: null,
};

const admin = (state = initialState, action) => {
    const { payload, type, error } = action;

    switch (type) {
        case actionTypes.SET_IS_LOADING: {
            return {
              ...state,
              isLoading: true,
            };
          }
          case actionTypes.UNSET_IS_LOADING:{
            return {
              ...state,
              isLoading: false,
            };
          }
        case actionTypes.ADMIN_LOGIN_REQUEST:
        case actionTypes.ADMIN_LOGOUT_REQUEST:
        case actionTypes.ADMIN_CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.ADMIN_LOGIN_SUCCESS:
        case actionTypes.ADMIN_LOGOUT_SUCCESS:
        case actionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                adminData: payload,
                error: null
            };
        case actionTypes.ADMIN_LOGIN_FAILURE:
        case actionTypes.ADMIN_LOGOUT_FAILURE:
        case actionTypes.ADMIN_CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: error
            };
        case actionTypes.SET_API_PAYLOAD:
            return {
                ...state,
                apiPayload: false,
            };
        case actionTypes.SET_ALL_SUBADMIN:
            return {
                ...state,
                adminListData: payload,
            };
        case actionTypes.SET_SUB_ADMIN_BY_ID:
            return {
                ...state,
                subAdminByIdData: payload,
            };
        case actionTypes.SET_ADMIN_TYPE:
            return {
                ...state,
                adminType: payload,
            };
        default:
            return state;
    }
};

export default admin;
