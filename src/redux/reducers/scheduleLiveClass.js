import * as actionTypes from "../actionTypes";

const initialState = {
  scheduleLiveClassData: [],
  isLoading:false,
};

const scheduleLiveClass = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    } 
    case actionTypes.SCHEDULE_CLASS: {
      return {
        ...state,
        scheduleLiveClassData: payload,
      };
    } 

    case actionTypes.SCHEDULE_CLASS_LIST: {
      return {
        ...state,
        scheduleLiveClassData: payload,
      };
    }

    case actionTypes.UPDATE_SCHEDULE_CLASS: {
      
      return {
          ...state,
          scheduleLiveClassData: payload,
      };
  }
  case actionTypes.UPDATE_SCHEDULE_CLASS_STATUS: {
   
    return {
        ...state,
        scheduleLiveClassData: payload,
    };
}

  case actionTypes.DELETE_SCHEDULE_CLASS: {
    return {
      ...state,
      scheduleLiveClassData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default scheduleLiveClass;
