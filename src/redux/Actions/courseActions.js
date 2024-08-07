import * as actionTypes from "../actionTypes";
export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});
export const getCourseData = (payload) => ({
  type: actionTypes.GET_ALL_COURSES,
  payload,
});
export const getActiveCourseData = (payload) => ({
  type: actionTypes.GET_ACTIVE_COURSES,
  payload,
});

export const addCourse = (payload) => ({
  type: actionTypes.CREATE_COURSE,
  payload,
});


export const updateCourse = payload =>({
  type: actionTypes.UPDATE_COURSE,
  payload
})
export const updateCourseStatus = payload =>({
  type: actionTypes.UPDATE_COURSE_STATUS,
  payload
})

export const deleteCourse = payload =>({
  type: actionTypes.DELETE_COURSE,
  payload
})
