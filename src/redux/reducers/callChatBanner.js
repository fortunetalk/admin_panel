import * as actionTypes from "../actionTypes";

const initialState = {
  callChatBannerData: null,
};

const callChatBanner = (state = initialState, actions) => {
  const { payload, type } = actions;
  switch (type) {
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
