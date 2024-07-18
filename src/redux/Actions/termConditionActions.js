import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
    type: actionTypes.SET_IS_LOADING,
    payload: true,
  });
  export const unsetIsLoading = () => ({
    type: actionTypes.UNSET_IS_LOADING,
    payload: false,
  });

export const addTermCondtion = payload =>({
    type: actionTypes.CREATE_TERMS_AND_CONDITION,
    payload
})
export const getAllTermCondtionList = () =>({
    type: actionTypes.TERMS_AND_CONDITION_LIST,
})
export const updateTermCondtion = payload =>({
    type: actionTypes.UPDATE_TERMS_AND_CONDITION,
    payload
})
export const deleteTermCondtion = payload =>({
    type: actionTypes.DELETE_TERMS_AND_CONDITION,
    payload
})
export const updateTermConditionStatus = payload =>({
    type: actionTypes.UPDATE_TERMS_AND_CONDITION_STATUS,
    payload
})