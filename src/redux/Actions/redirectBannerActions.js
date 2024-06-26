import * as actionTypes from "../actionTypes";

export const addRedirectionBanner = payload =>({
    type: actionTypes.CREATE_REDIRECTION_BANNER,
    payload
})
export const getRedirectionBanners = payload =>({
    type: actionTypes.GET_REDIRECTION_BANNER,
    payload
})
export const updateRedirectBanner = payload =>({
    type: actionTypes.UPDATE_REDIRECTION_BANNER,
    payload
  })

export const updateRedirectBannerStatus = payload =>({
    type: actionTypes.CHANGE_REDIRECTION_BANNER_STATUS,
    payload
  })

  export const deleteRedirectBanner = payload =>({
    type: actionTypes.DELETE_REDIRECTION_BANNER,
    payload
  })

