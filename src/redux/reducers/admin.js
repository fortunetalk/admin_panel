import * as actionTypes from "../actionTypes";

const initialState = {
    adminData: null,
    isLoading: false,
    error: null
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
        default:
            return state;
    }
};

export default admin;
