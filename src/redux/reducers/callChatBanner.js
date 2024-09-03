import * as actionTypes from "../actionTypes";

const initialState = {
  callChatBannerData: null,
  isLoading: false,
};

const callChatBanner = (state = initialState, actions) => {
  const { payload, type } = actions;
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
    case actionTypes.CREATE_CALL_CHAT_BANNER: {
      return {
        ...state,
        callChatBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_CALL_CHAT_BANNER: {
      return {
        ...state,
        callChatBannerData: payload,
      };
    }
    case actionTypes.UPDATE_CALL_CHAT_BANNER: {
      
      return {
          ...state,
          callChatBannerData: payload,
      };
  }
  case actionTypes.UPDATE_CALL_CHAT_BANNER_STATUS: {
   
    return {
        ...state,
        callChatBannerData: payload,
    };
}
  case actionTypes.DELETE_CALL_CHAT_BANNER: {
    return {
      ...state,
      callChatBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default callChatBanner;
