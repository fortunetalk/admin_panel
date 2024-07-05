import * as actionTypes from "../actionTypes";

const initialState = {
  workshopData: null,
  isLoading: false,

};

const workshop = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_WORKSHOP: {
      return {
        ...state,
        workshopData: payload,
      };
    } 

    case actionTypes.WORKSHOP_LIST: {
      return {
        ...state,
        workshopData: payload,
      };
    }

    case actionTypes.UPDATE_WORKSHOP: {
      
      return {
          ...state,
          workshopData: payload,
      };
  }
  case actionTypes.UPDATE_WORKSHOP_STATUS: {
   
    return {
        ...state,
        workshopData: payload,
    };
}
  case actionTypes.UPDATE_WORKSHOP_ADMIN_STATUS: {
   
    return {
        ...state,
        workshopData: payload,
    };
}
  case actionTypes.DELETE_WORKSHOP: {
    return {
      ...state,
      workshopData: payload,
    };
  }
  case actionTypes.SET_IS_LOADING: {
    return {
      ...state,
      isLoading: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default workshop;
