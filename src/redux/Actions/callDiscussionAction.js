import * as actionTypes from "../actionTypes";

export const addCallDiscussion = payload =>({
    type: actionTypes.ADD_CALL_DISCUSSION,
    payload
})

export const getCallDiscussion = (payload) => ({
  type: actionTypes.GET_CALL_DISCUSSION,
  payload,
});

export const setCallDiscussion = (payload) => ({
  type: actionTypes.SET_CALL_DISCUSSION,
  payload,
});


export const updateCallDiscussion = (payload) => ({
  type: actionTypes.UPDATE_CALL_DISCUSSION,
  payload,
});

export const deleteCallDiscussion = (payload) => ({
  type: actionTypes.DELETE_CALL_DISCUSSION,
  payload,
});
