import * as actionTypes from "../actionTypes";

const initialState = {
  productCategoryData: null,
};

const productCategory = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_PRODUCT_CATEGORY: {
      return {
        ...state,
        productCategoryData: payload,
      };
    } 

    case actionTypes.PRODUCT_CATEGORY_LIST: {
      return {
        ...state,
        productCategoryData: payload,
      };
    }
    case actionTypes.UPDATE_PRODUCT_CATEGORY_STATUS: {
      const { categoryId, status } = payload;
      const updatedData = state.productCategoryData?.map(data =>
          data._id === categoryId ? { ...data, status, categoryId } : data
      );
      return {
          ...state,
          productCategoryData: updatedData,
      };
  }
  case actionTypes.UPDATE_PRODUCT_CATEGORY: {
   
    return {
        ...state,
        productCategoryData: payload,
    };
}
  case actionTypes.DELETE_PRODUCT_CATEGORY: {
    return {
      ...state,
      productCategoryData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default productCategory;
