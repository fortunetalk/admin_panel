import * as actionTypes from "../actionTypes";

const initialState = {
  ecommerceBannerData: null,
};

const courseBanner = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_ECOMMERCE_BANNER: {
      return {
        ...state,
        ecommerceBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_ECOMMERCE_BANNER: {
      return {
        ...state,
        ecommerceBannerData: payload,
      };
    }
    case actionTypes.UPDATE_ECOMMERCE_BANNER: {
      
      return {
          ...state,
          ecommerceBannerData: payload,
      };
  }
  case actionTypes.UPDATE_ECOMMERCE_BANNER_STATUS: {
   
    return {
        ...state,
        ecommerceBannerData: payload,
    };
}
  case actionTypes.DELETE_ECOMMERCE_BANNER: {
    return {
      ...state,
      ecommerceBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default courseBanner;
