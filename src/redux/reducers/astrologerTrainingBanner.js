import * as actionTypes from "../actionTypes";

const initialState = {
  astrologerTrainingBannerData: null,
  isLoading: false,
};

const astrologerTrainingBanner = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    } 
    case actionTypes.CREATE_ASTROLOGER_TRAINING_BANNER: {
      return {
        ...state,
        astrologerTrainingBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER: {
      return {
        ...state,
        astrologerTrainingBannerData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_TRAINING_BANNER: {
      
      return {
          ...state,
          astrologerTrainingBannerData: payload,
      };
  }
  case actionTypes.UPDATE_ASTROLOGER_TRAINING_BANNER_STATUS: {
   
    return {
        ...state,
        astrologerTrainingBannerData: payload,
    };
}
  case actionTypes.DELETE_ASTROLOGER_TRAINING_BANNER: {
    return {
      ...state,
      astrologerTrainingBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default astrologerTrainingBanner;
