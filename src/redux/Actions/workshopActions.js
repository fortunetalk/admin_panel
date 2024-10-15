import * as actionTypes from "../actionTypes";


export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});
export const getWorkshopData = (payload) => ({
  type: actionTypes.WORKSHOP_LIST,
  payload,
});

export const addWorkshop = (payload) => ({
  type: actionTypes.CREATE_WORKSHOP,
  payload,
});


export const updateWorkshop = payload =>({
  type: actionTypes.UPDATE_WORKSHOP,
  payload
})
export const updateWorkshopStatus = payload =>({
  type: actionTypes.UPDATE_WORKSHOP_STATUS,
  payload
})
export const updateWorkshopAdminStatus = payload =>({
  type: actionTypes.UPDATE_WORKSHOP_ADMIN_STATUS,
  payload
})

export const deleteWorkshop = payload =>({
  type: actionTypes.DELETE_WORKSHOP,
  payload
})
