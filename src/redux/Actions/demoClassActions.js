import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});


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
export const updateDemoClassAdminStatus = payload =>({
  type: actionTypes.UPDATE_DEMO_CLASS_ADMIN_STATUS,
  payload
})

export const deleteDemoClass = payload =>({
  type: actionTypes.UPDATE_DEMO_CLASS_ONGOING_STATUS,
  payload
})

export const updateDemoClassOngoingStatus = payload =>({
  type: actionTypes.UPDATE_DEMO_CLASS_ONGOING_STATUS,
  payload
});
