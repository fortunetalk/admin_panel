import * as actionTypes from "../actionTypes";

export const getCourseData = (payload) => ({
  type: actionTypes.GET_ALL_COURSES,
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
