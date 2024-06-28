import * as actionTypes from "../actionTypes";

const initialState = {
  demoClassData: null,
};

const demoClass = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_DEMO_CLASS: {
      return {
        ...state,
        demoClassData: payload,
      };
    } 

    case actionTypes.DEMO_CLASS_LIST: {
      return {
        ...state,
        demoClassData: payload,
      };
    }

    case actionTypes.UPDATE_DEMO_CLASS: {
      
      return {
          ...state,
          demoClassData: payload,
      };
  }
  case actionTypes.UPDATE_DEMO_CLASS_STATUS: {
   
    return {
        ...state,
        demoClassData: payload,
    };
}
  case actionTypes.DELETE_DEMO_CLASS: {
    return {
      ...state,
      demoClassData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default demoClass;
