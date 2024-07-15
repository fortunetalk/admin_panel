import * as actionTypes from "../actionTypes";

const initialState = {
  privacyPolicyData: null,
  isLoading: false,
};

const privacyPolicy = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    } 
    case actionTypes.CREATE_PRIVACY_POLICY: {
      return {
        ...state,
        privacyPolicyData: payload,
      };
    } 

    case actionTypes.PRIVACY_POLICY_LIST: {
      return {
        ...state,
        privacyPolicyData: payload,
      };
    }
    case actionTypes.UPDATE_PRIVACY_POLICY: {
      
      return {
          ...state,
          privacyPolicyData: payload,
      };
  }
  case actionTypes.UPDATE_PRIVACY_POLICY_STATUS: {
   
    return {
        ...state,
        privacyPolicyData: payload,
    };
}
  case actionTypes.DELETE_PRIVACY_POLICY: {
    return {
      ...state,
      privacyPolicyData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default privacyPolicy;
