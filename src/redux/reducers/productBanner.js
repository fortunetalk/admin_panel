import * as actionTypes from "../actionTypes";

const initialState = {
  productBannerData: null,
};

const productBanner = (state = initialState, actions) => {
  const { payload, type } = actions;
  switch (type) {
    case actionTypes.CREATE_PRODUCT_BANNER: {
      return {
        ...state,
        productBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_PRODUCT_BANNER: {
      return {
        ...state,
        productBannerData: payload,
      };
    }
    case actionTypes.UPDATE_PRODUCT_BANNER: {
      
      return {
          ...state,
          productBannerData: payload,
      };
  }
  case actionTypes.UPDATE_PRODUCT_BANNER_STATUS: {
   
    return {
        ...state,
        productBannerData: payload,
    };
}
  case actionTypes.DELETE_PRODUCT_BANNER: {
    return {
      ...state,
      productBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default productBanner;
