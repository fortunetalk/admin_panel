import * as actionTypes from "../actionTypes";

const initialState = {
  chatHistoryData: null,
  chatSummaryData: [],
  callHistoryData: null,
  customerFirebaseID: null,
  rechargeHistoryData: null,
  demoClassHistoryData: null,
  liveClassHistoryData: null,
  liveCourseHistoryData:null,
  isLoading: false,

};

const history = (state = initialState, actions) => {
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
    case actionTypes.SET_CHAT_HISTORY: {
      return {
        ...state,
        chatHistoryData: payload,
      };
    }

    case actionTypes.SET_CHAT_SUMMARY: {
      return {
        ...state,
        chatSummaryData: payload,
      };
    }

    case actionTypes.SET_CALL_HISTORY: {
      return {
        ...state,
        callHistoryData: payload,
      };
    }
    case actionTypes.GET_DEMO_CLASS_HISTORY: {
      return {
        ...state,
        demoClassHistoryData: payload,
      };
    }
    case actionTypes.UPDATE_DEMO_CLASS_HISTORY_STATUS: {
      return {
        ...state,
        demoClassHistoryData: payload,
      };
    }
    case actionTypes.DELETE_DEMO_CLASS_HISTORY: {
      return {
        ...state,
        demoClassHistoryData: payload,
      };
    }



    case actionTypes.GET_LIVE_CLASS_HISTORY: {
      return {
        ...state,
        liveClassHistoryData: payload,
      };
    }
    case actionTypes.UPDATE_LIVE_CLASS_HISTORY_STATUS: {
      return {
        ...state,
        liveClassHistoryData: payload,
      };
    }
    case actionTypes.DELETE_LIVE_CLASS_HISTORY: {
      return {
        ...state,
        liveClassHistoryData: payload,
      };
    }
    case actionTypes.SET_RECHARGE_HISTORY: {
      return {
        ...state,
        rechargeHistoryData: payload,
      };
    }

    case actionTypes.SET_CUSTOMER_FIREBASE_ID: {
      return {
        ...state,
        customerFirebaseID: payload,
      };
    }
    case actionTypes.GET_LIVE_COURSE_HISTORY: {
      return {
        ...state,
        liveCourseHistoryData: payload,
      };
    }
    case actionTypes.CHANGE_LIVE_COURSE_HISTORY_STATUS: {
      return {
        ...state,
        liveCourseHistoryData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default history;
