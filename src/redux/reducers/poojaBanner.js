import * as actionTypes from "../actionTypes";

const initialState = {
  poojaBannerData: null,
};

const poojaBanner = (state = initialState, actions) => {
  const { payload, type } = actions;
  switch (type) {
    case actionTypes.CREATE_POOJA_BANNER: {
      return {
        ...state,
        poojaBannerData: payload,
      };
    } 

    case actionTypes.GET_ALL_POOJA_BANNER: {
      return {
        ...state,
        poojaBannerData: payload,
      };
    }
    case actionTypes.UPDATE_POOJA_BANNER: {
      
      return {
          ...state,
          poojaBannerData: payload,
      };
  }
  case actionTypes.UPDATE_POOJA_BANNER_STATUS: {
   
    return {
        ...state,
        poojaBannerData: payload,
    };
}
  case actionTypes.DELETE_POOJA_BANNER: {
    return {
      ...state,
      poojaBannerData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default poojaBanner;
