import * as actionTypes from "../actionTypes";

const initialState = {
  customerNotificationData: null,
  astrologerNotificationData: null,
  isLoading:false,
};

const notification = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case actionTypes.SET_CUSTOMER_NOTIFICATIONS: {
      return {
        ...state,
        customerNotificationData: payload,
      };
    }
    case actionTypes.ADD_CUSTOMER_NOTIFICATION: {
      return {
        ...state,
        customerNotificationData: payload,
      };
    }
    case actionTypes.UPDATE_CUSTOMER_NOTIFICATION: {
      return {
        ...state,
        customerNotificationData: payload,
      };
    }
    case actionTypes.UPDATE_CUSTOMER_NOTIFICATION_STATUS: {
      return {
        ...state,
        customerNotificationData: payload,
      };
    }
    case actionTypes.DELETE_CUSTOMER_NOTIFICATION: {
      return {
        ...state,
        customerNotificationData: payload,
      };
    }

    case actionTypes.SET_ASTROLOGER_NOTIFICATIONS: {
      return {
        ...state,
        astrologerNotificationData: payload,
      };
    }
    case actionTypes.ADD_ASTROLOGER_NOTIFICATION: {
      return {
        ...state,
        astrologerNotificationData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_NOTIFICATION: {
      return {
        ...state,
        astrologerNotificationData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_NOTIFICATION_STATUS: {
      return {
        ...state,
        astrologerNotificationData: payload,
      };
    }
    case actionTypes.DELETE_ASTROLOGER_NOTIFICATION: {
      return {
        ...state,
        astrologerNotificationData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default notification;
