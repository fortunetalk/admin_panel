import * as actionTypes from "../actionTypes";

const initialState = {
  customerListData: null,
  addRechargeByAdmin: null,
  isLoading: false,
};

const customer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case actionTypes.ADD_CUSTOMER: {
      return {
        ...state,
        customerListData: payload,
      };
    }
    case actionTypes.SET_ALL_CUSTOMER: {
      return {
        ...state,
        customerListData: payload,
      };
    }
    case actionTypes.DELETE_CUSTOMER: {
      return {
        ...state,
        customerListData: payload,
      };
    }
    case actionTypes.ADD_RECHARGE_BY_ADMIN: {
      return {
        ...state,
        addRechargeByAdmin: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default customer;
