import * as actionTypes from "../actionTypes";

const initialState = {
  productData: null,
};

const product = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_PRODUCT: {
      return {
        ...state,
        productData: payload,
      };
    } 

    case actionTypes.PRODUCT_LIST: {
      return {
        ...state,
        productData: payload,
      };
    }
    case actionTypes.UPDATE_PRODUCT_STATUS: {
      
      return {
          ...state,
          productData: payload,
      };
  }
  case actionTypes.UPDATE_PRODUCT: {
   
    return {
        ...state,
        productData: payload,
    };
}
  case actionTypes.DELETE_PRODUCT: {
    return {
      ...state,
      productData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default product;
