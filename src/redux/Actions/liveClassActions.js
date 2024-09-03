import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});

export const getLiveClassData = (payload) => ({
  type: actionTypes.LIVE_CLASS_LIST,
  payload,
});

export const addLiveClass = (payload) => ({
  type: actionTypes.CREATE_LIVE_CLASS,
  payload,
});

export const updateLiveClass = payload =>({
  type: actionTypes.UPDATE_LIVE_CLASS,
  payload
});

export const updateLiveClassStatus = payload =>({
  type: actionTypes.UPDATE_LIVE_CLASS_STATUS,
  payload
});

export const updateLiveClassAdminStatus = payload =>({
  type: actionTypes.UPDATE_LIVE_CLASS_ADMIN_STATUS,
  payload
});
export const updateLiveClassOngoingStatus = payload =>({
  type: actionTypes.UPDATE_LIVE_CLASS_ONGOING_STATUS,
  payload
});

export const deleteLiveClass = payload =>({
  type: actionTypes.DELETE_LIVE_CLASS,
  payload
})
