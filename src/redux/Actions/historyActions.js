import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
    type: actionTypes.SET_IS_LOADING,
    payload: true,
});

export const unsetIsLoading = () => ({
    type: actionTypes.UNSET_IS_LOADING,
    payload: false,
});

export const getChatHistory = payload =>({
    type: actionTypes.GET_CHAT_HISTORY,
    payload
})

export const setChatHistory = payload =>({
    type: actionTypes.SET_CHAT_HISTORY,
    payload
})
export const setChatHistoryApiPayload = payload =>({
    type: actionTypes.SET_CHAT_HISTORY_API_PAYLOAD,
    payload
})
export const setCallHistoryApiPayload = payload =>({
    type: actionTypes.SET_CALL_HISTORY_API_PAYLOAD,
    payload
})
export const deleteChatHistory = payload =>({
    type: actionTypes.DELETE_CHAT_HISTORY,
    payload
})

export const getChatSummary = payload =>({
    type: actionTypes.GET_CHAT_SUMMARY,
    payload
})

export const setChatSummary = payload =>({
    type: actionTypes.SET_CHAT_SUMMARY,
    payload
})

export const getCallHistory = payload =>({
    type: actionTypes.GET_CALL_HISTORY,
    payload
})

export const setCallHistory = payload =>({
    type: actionTypes.SET_CALL_HISTORY,
    payload
})
export const deleteCallHistory = payload =>({
    type: actionTypes.DELETE_CALL_HISTORY,
    payload
})
export const getRechargeHistory = payload =>({
    type: actionTypes.GET_RECHARGE_HISTORY,
    payload
})

export const setRechargeHistory = payload =>({
    type: actionTypes.SET_RECHARGE_HISTORY,
    payload
})

export const setCustomerFirebaseId = payload =>({
    type: actionTypes.SET_CUSTOMER_FIREBASE_ID,
    payload
})

export const getDemoClassHistory = payload =>({
    type: actionTypes.GET_DEMO_CLASS_HISTORY,
    payload
})

export const setDemoClassHistory = payload =>({
    type: actionTypes.SET_DEMO_CLASS_HISTORY,
    payload
})
export const deleteDemoClassHistory = payload =>({
    type: actionTypes.DELETE_DEMO_CLASS_HISTORY,
    payload
})
export const deleteLiveClassHistory = payload =>({
    type: actionTypes.DELETE_LIVE_CLASS_HISTORY,
    payload
})
export const updateDemoClassHistoryStatus = payload =>({
    type: actionTypes.UPDATE_DEMO_CLASS_HISTORY_STATUS,
    payload
})
export const updateLiveClassHistoryStatus = payload =>({
    type: actionTypes.UPDATE_LIVE_CLASS_HISTORY_STATUS,
    payload
})

export const getLiveClassHistory = payload =>({
    type: actionTypes.GET_LIVE_CLASS_HISTORY,
    payload
})

export const setLiveClassHistory = payload =>({
    type: actionTypes.SET_LIVE_CLASS_HISTORY,
    payload
})
export const getLiveCourseHistory = payload =>({
    type: actionTypes.GET_LIVE_COURSE_HISTORY,
    payload
})
export const updateLiveCourseHistoryStatus = payload =>({
    type: actionTypes.CHANGE_LIVE_COURSE_HISTORY_STATUS,
    payload
})

export const getRegisterLiveClassHistory = payload =>({
    type: actionTypes.GET_REGISTER_LIVE_CLASS_HISTORY,
    payload
})

export const getDownloadChatHistory = payload =>({
    type: actionTypes.GET_DOWNLOAD_CHAT_HISTORY,
    payload
})
export const setDownloadChatHistory = payload =>({
    type: actionTypes.SET_DOWNLOAD_CHAT_HISTORY,
    payload
})
export const getDownloadCallHistory = payload =>({
    type: actionTypes.GET_DOWNLOAD_CALL_HISTORY,
    payload
})
export const setDownloadCallHistory = payload =>({
    type: actionTypes.SET_DOWNLOAD_CALL_HISTORY,
    payload
})

export const updateAdminChatReview = payload =>({
    type: actionTypes.UPDATE_ADMIN_CHAT_REVIEW, 
    payload
  })

export const updateAdminCallReview = payload =>({
    type: actionTypes.UPDATE_ADMIN_CALL_REVIEW, 
    payload
  })