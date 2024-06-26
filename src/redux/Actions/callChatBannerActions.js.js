import * as actionTypes from "../actionTypes";

export const getCallChatBannerData = (payload) => ({
  type: actionTypes.GET_ALL_CALL_CHAT_BANNER,
  payload,
});


export const createCallChatBanner = payload =>({
  type: actionTypes.CREATE_CALL_CHAT_BANNER,
  payload
})

export const updateCallChatBanner = payload =>({
  type: actionTypes.UPDATE_CALL_CHAT_BANNER,
  payload
})
export const updateCallChatBannerStatus = payload =>({
  type: actionTypes.UPDATE_CALL_CHAT_BANNER_STATUS,
  payload
})

export const deleteCallChatBanner = payload =>({
  type: actionTypes.DELETE_CALL_CHAT_BANNER,
  payload
})
