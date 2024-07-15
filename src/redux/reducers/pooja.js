import * as actionTypes from "../actionTypes";

const initialState = {
  poojaData: null,
};

const pooja = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_POOJA: {
      return {
        ...state,
        poojaData: payload,
      };
    } 

    case actionTypes.POOJA_LIST: {
      return {
        ...state,
        poojaData: payload,
      };
    }
    case actionTypes.UPDATE_POOJA_STATUS: {
      
      return {
          ...state,
          poojaData: payload,
      };
  }
  case actionTypes.UPDATE_POOJA: {
   
    return {
        ...state,
        poojaData: payload,
    };
}
  case actionTypes.DELETE_POOJA: {
    return {
      ...state,
      poojaData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default pooja;
