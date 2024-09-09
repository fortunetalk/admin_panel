import * as actionTypes from "../actionTypes";

export const getRechargeHistory = (payload) => ({
  type: actionTypes.RECHARGE_HISTORY_LIST,
  payload,
});

export const addRechargeHistory = (payload) => ({
  type: actionTypes.RECHARGE_HISTORY_ADD,
  payload,
});

export const deleteRechargeHistory = (payload) => ({
  type: actionTypes.RECHARGE_HISTORY_DELETE,
  payload,
});

