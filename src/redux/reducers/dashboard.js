import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  isSidebarOpen: true,
  dashboardData: null
};

const dashboard = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) { 
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case actionTypes.SET_IS_SIDEBAR_OPEN: {
      return {
        ...state,
        isSidebarOpen: payload,
      };
    }

    case actionTypes.SET_DASHBOARD: {
      return {
        ...state,
        dashboardData: payload,
      };
    }
    case actionTypes.GET_DASHBOARD: {
      return {
        ...state,
        dashboardData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default dashboard;
