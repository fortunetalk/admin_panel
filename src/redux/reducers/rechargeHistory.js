import * as actionTypes from "../actionTypes";

const initialState = {
    rechargeHistoryData: null,
};
 
const rechargeHistory = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    
    case actionTypes.RECHARGE_HISTORY_LIST: {
      return {
        ...state,
        rechargeHistoryData: payload,
      };
    }
 

    default: { 
      return state;
    }
  }
};

export default rechargeHistory;
