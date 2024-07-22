import * as actionTypes from "../actionTypes";

export const getRechargeHistory = (payload) => ({
  type: actionTypes.RECHARGE_HISTORY_LIST,
  payload,
});

