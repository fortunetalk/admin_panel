import * as actionTypes from "../actionTypes";
export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});
export const getRemediesData = (payload) => ({
  type: actionTypes.GET_ALL_REMEDIES,
  payload,
});
export const getActiveRemediesData = (payload) => ({
  type: actionTypes.GET_ALL_ACTIVE_REMEDIES,
  payload,
});

export const setRemediesData = (payload) => ({
  type: actionTypes.SET_ALL_REMEDIES,
  payload,
});

export const createRemedy = payload =>({
  type: actionTypes.CREATE_REMEDY,
  payload
})

export const updateRemedy = payload =>({
  type: actionTypes.UPDATE_REMEDY,
  payload
})
export const updateRemedyStatus = payload =>({
  type: actionTypes.CHANGE_REMEDY_STATUS,
  payload
})

export const deleteRemedy = payload =>({
  type: actionTypes.DELETE_REMEDY,
  payload
})
