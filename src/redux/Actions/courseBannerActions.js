import * as actionTypes from "../actionTypes";

export const getCourseBannerData = (payload) => ({
  type: actionTypes.GET_ALL_COURSE_BANNER,
  payload,
});


export const createCourseBanner = payload =>({
  type: actionTypes.CREATE_COURSE_BANNER,
  payload
})

export const updateCourseBanner = payload =>({
  type: actionTypes.UPDATE_COURSE_BANNER,
  payload
})
export const updateCourseBannerStatus = payload =>({
  type: actionTypes.UPDATE_COURSE_BANNER_STATUS,
  payload
})

export const deleteCourseBanner = payload =>({
  type: actionTypes.DELETE_COURSE_BANNER,
  payload
})
