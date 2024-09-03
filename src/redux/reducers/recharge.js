import * as actionTypes from "../actionTypes";

const initialState = {
  rechargePlanData: null,
  firstRechareOfferData: null,
  isLoading: false,
};

const recharge = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
  
    case actionTypes.SET_RECHARGE_PLAN: {
      return {
        ...state,
        rechargePlanData: payload,
      };
    }
    case actionTypes.UPDATE_RECHARGE_PLAN: {
      return {
        ...state,
        rechargePlanData: payload,
      };
    }
    
    case actionTypes.SET_FIRST_RECHARGE_OFFER: {
      return {
        ...state,
        firstRechareOfferData: payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default recharge;
