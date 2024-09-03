import * as actionTypes from "../actionTypes";

const initialState = {
  courseBannerData: null,
  isLoading: false,
};

const courseBanner = (state = initialState, actions) => {
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
    case actionTypes.CREATE_COURSE_BANNER: {
      return {
        ...state,
        courseBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_COURSE_BANNER: {
      return {
        ...state,
        courseBannerData: payload,
      };
    }
    case actionTypes.UPDATE_COURSE_BANNER: {
      
      return {
          ...state,
          courseBannerData: payload,
      };
  }
  case actionTypes.UPDATE_COURSE_BANNER_STATUS: {
   
    return {
        ...state,
        courseBannerData: payload,
    };
}
  case actionTypes.DELETE_COURSE_BANNER: {
    return {
      ...state,
      courseBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default courseBanner;
