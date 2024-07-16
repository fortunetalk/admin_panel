import * as actionTypes from "../actionTypes";

const initialState = {
  chatHistoryData: null,
  chatSummaryData: [],
  callHistoryData: null,
  customerFirebaseID: null,
  rechargeHistoryData: null,
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

    default: {
      return state;
    }
  }
};

export default history;
