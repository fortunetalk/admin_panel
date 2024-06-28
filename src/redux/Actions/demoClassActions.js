import * as actionTypes from "../actionTypes";

export const getDemoClassData = (payload) => ({
  type: actionTypes.DEMO_CLASS_LIST,
  payload,
});

export const addDemoClass = (payload) => ({
  type: actionTypes.CREATE_DEMO_CLASS,
  payload,
});


export const updateDemoClass = payload =>({
  type: actionTypes.UPDATE_DEMO_CLASS,
  payload
})
export const updateDemoClassStatus = payload =>({
  type: actionTypes.UPDATE_DEMO_CLASS_STATUS,
  payload
})

export const deleteDemoClass = payload =>({
  type: actionTypes.DELETE_DEMO_CLASS,
  payload
})
