import * as actionTypes from "../actionTypes";

const initialState = {
  courseBannerData: null,
};

const courseBanner = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
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
