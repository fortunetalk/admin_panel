import * as actionTypes from "../actionTypes";

const initialState = {
  giftData: null,
  isLoading: false,
};

const gift = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    } 
    case actionTypes.CREATE_GIFT: {
      return {
        ...state,
        giftData: payload,
      };
    } 

    case actionTypes.GIFT_LIST: {
      return {
        ...state,
        giftData: payload,
      };
    }
    case actionTypes.UPDATE_GIFT: {
      
      return {
          ...state,
          giftData: payload,
      };
  }
  case actionTypes.UPDATE_GIFT_STATUS: {
   
    return {
        ...state,
        giftData: payload,
    };
}
  case actionTypes.DELETE_GIFT: {
    return {
      ...state,
      giftData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default gift;
