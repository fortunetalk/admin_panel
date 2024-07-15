import * as actionTypes from "../actionTypes";

const initialState = {
  astrologerBannerData: [],
  isLoading: false,
};

const astrologerBanner = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    } 
    case actionTypes.CREATE_ASTROLOGER_BANNER: {
      return {
        ...state,
        astrologerBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_ASTROLOGER_BANNER: {
      return {
        ...state,
        astrologerBannerData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_BANNER: {
      
      return {
          ...state,
          astrologerBannerData: payload,
      };
  }
  case actionTypes.UPDATE_ASTROLOGER_BANNER_STATUS: {
   
    return {
        ...state,
        astrologerBannerData: payload,
    };
}
  case actionTypes.DELETE_ASTROLOGER_BANNER: {
    return {
      ...state,
      astrologerBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default astrologerBanner;
