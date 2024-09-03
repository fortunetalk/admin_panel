import * as actionTypes from "../actionTypes";

const initialState = {
  liveClassData: null,
  isLoading: false,
};

const liveClass = (state = initialState, actions) => {
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
    case actionTypes.CREATE_LIVE_CLASS: {
      return {
        ...state,
        liveClassData: payload,
      };
    }

    case actionTypes.LIVE_CLASS_LIST: {
      return {
        ...state,
        liveClassData: payload,
      };
    }

    case actionTypes.UPDATE_LIVE_CLASS: {

      return {
        ...state,
        liveClassData: payload,
      };
    }
    case actionTypes.UPDATE_LIVE_CLASS_STATUS: {

      return {
        ...state,
        liveClassData: payload,
      };
    }
    case actionTypes.UPDATE_LIVE_CLASS_ADMIN_STATUS: {

      return {
        ...state,
        liveClassData: payload,
      };
    }
    case actionTypes.UPDATE_LIVE_CLASS_ONGOING_STATUS: {

      return {
        ...state,
        liveClassData: payload,
      };
    }
    case actionTypes.DELETE_LIVE_CLASS: {
      return {
        ...state,
        liveClassData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default liveClass;
