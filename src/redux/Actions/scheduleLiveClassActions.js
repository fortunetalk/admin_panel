import * as actionTypes from "../actionTypes";

export const getScheduleClassData = (liveClassId) => ({
    type: actionTypes.SCHEDULE_CLASS_LIST,
    payload: { liveClassId },
  });
  
export const addScheduleClass = (payload) => ({
  type: actionTypes.SCHEDULE_CLASS,
  payload,
});


export const updateScheduleClass = payload =>({
  type: actionTypes.UPDATE_SCHEDULE_CLASS,
  payload
})
export const updateScheduleClassStatus = payload =>({
  type: actionTypes.UPDATE_SCHEDULE_CLASS_STATUS,
  payload
})

export const deleteScheduleClass = payload =>({
  type: actionTypes.DELETE_SCHEDULE_CLASS,
  payload
})
