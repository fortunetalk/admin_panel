import * as actionTypes from "../actionTypes";

const initialState = {
  termsAndConditionData: [],
  isLoading: false,
};

const termsAndCondition = (state = initialState, actions) => {
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
    case actionTypes.CREATE_TERMS_AND_CONDITION: {
      return {
        ...state,
        termsAndConditionData: payload,
      };
    } 

    case actionTypes.TERMS_AND_CONDITION_LIST: {
      return {
        ...state,
        termsAndConditionData: payload,
      };
    }
    case actionTypes.UPDATE_TERMS_AND_CONDITION: {
      
      return {
          ...state,
          termsAndConditionData: payload,
      };
  }
  case actionTypes.UPDATE_TERMS_AND_CONDITION_STATUS: {
   
    return {
        ...state,
        termsAndConditionData: payload,
    };
}
  case actionTypes.DELETE_TERMS_AND_CONDITION: {
    return {
      ...state,
      termsAndConditionData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default termsAndCondition;
