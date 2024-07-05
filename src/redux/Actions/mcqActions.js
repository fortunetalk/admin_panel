import * as actionTypes from "../actionTypes";

export const getMCQData = (payload) => ({
  type: actionTypes.MCQ_LIST,
  payload,
});

export const addMCQ = (payload) => ({
  type: actionTypes.CREATE_MCQ,
  payload,
});


export const updateMCQ = payload =>({
  type: actionTypes.UPDATE_MCQ,
  payload
})
export const updateMCQStatus = payload =>({
  type: actionTypes.UPDATE_MCQ_STATUS,
  payload
})


export const deleteMCQ = payload =>({
  type: actionTypes.DELETE_MCQ,
  payload
})
