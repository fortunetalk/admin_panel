import * as actionTypes from "../actionTypes";


export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});
export const getLiveStream = (payload) => ({
  type: actionTypes.LIVE_STREAM_LIST,
  payload,
});

export const updateLiveStreamStatus = payload =>({
  type: actionTypes.UPDATE_LIVE_STREAM_STATUS,
  payload
})

export const deleteLiveStream = payload =>({
  type: actionTypes.DELETE_LIVE_STREAM,
  payload
})
