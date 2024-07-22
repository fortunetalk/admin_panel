import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});
export const setExpertiesData = (payload) => ({
  type: actionTypes.SET_ALL_EXPERTIES,
  payload,
});

export const setMainExpertiesData = (payload) => ({
  type: actionTypes.SET_ALL_MAIN_EXPERTIES,
  payload,
});

export const getExpertiesData = (payload) => ({
  type: actionTypes.GET_ALL_EXPERTIES,
  payload,
});
export const getActiveExpertiesData = (payload) => ({
  type: actionTypes.GET_ALL_ACTIVE_EXPERTIES,
  payload,
});

export const getMainExpertiesData = (payload) => ({
  type: actionTypes.GET_ALL_MAIN_EXPERTIES,
  payload,
});

export const createExperties = (payload) => ({
  type: actionTypes.CREATE_EXPERTIES,
  payload,
});

export const createMainExperties = (payload) => ({
  type: actionTypes.CREATE_MAIN_EXPERTIES,
  payload,
});

export const updateExperties = (payload) => ({
  type: actionTypes.UPDATE_EXPERTIES,
  payload,
});

export const updateMainExperties = (payload) => ({
  type: actionTypes.UPDATE_MAIN_EXPERTIES,
  payload,
});

export const deleteExperties = (payload) => ({
  type: actionTypes.DELETE_EXPERTIES,
  payload,
});

export const deleteMainExperties = (payload) => ({
  type: actionTypes.DELETE_MAIN_EXPERTIES,
  payload,
});

export const updateExpertiesStatus = (payload) => ({
  type: actionTypes.UPDATE_EXPERTISE_STATUS,
  payload,
});
