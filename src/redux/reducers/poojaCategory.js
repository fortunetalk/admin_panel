import * as actionTypes from "../actionTypes";

const initialState = {
  poojaCategoryData: null,
};

const poojaCategory = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_POOJA_CATEGORY: {
      return {
        ...state,
        poojaCategoryData: payload,
      };
    } 

    case actionTypes.POOJA_CATEGORY_LIST: {
        return {
            ...state,
            poojaCategoryData: payload,
        };
    }
    
    case actionTypes.UPDATE_POOJA_CATEGORY_STATUS: {
      
      return {
          ...state,
          poojaCategoryData: payload,
      };
  }
  case actionTypes.UPDATE_POOJA_CATEGORY: {
    const { remedy_id, formData } = payload;
    const updatedData = state.poojaCategoryData?.map(data =>
        data._id === remedy_id ? { ...data, remedy_id, formData } : data
    );
    return {
        ...state,
        poojaCategoryData: updatedData,
    };
}
  case actionTypes.DELETE_POOJA_CATEGORY: {
     
      return {
          ...state,
          poojaCategoryData: payload,
      };
  }

    default: {
      return state;
    }
  }
};

export default poojaCategory;
