import * as actionTypes from "../actionTypes";

const initialState = {
  demoClassData: null,
  bookedDemoClassData: null,
  isLoading: false,

};

const demoClass = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.UNSET_IS_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
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
    case actionTypes.UPDATE_DEMO_CLASS_ADMIN_STATUS: {

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
    case actionTypes.UPDATE_DEMO_CLASS_ONGOING_STATUS: {
      return {
        ...state,
        demoClassData: payload,
      };
    }
    case actionTypes.BOOKED_DEMO_CLASS_LIST: {
      return {
        ...state,
        bookedDemoClassData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default demoClass;
