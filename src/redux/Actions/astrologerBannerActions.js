import * as actionTypes from "../actionTypes";

export const getAstrologerBannerData = (payload) => ({
  type: actionTypes.GET_ALL_ASTROLOGER_BANNER,
  payload,
});

export const createAstrologerBanner = payload =>({
  type: actionTypes.CREATE_ASTROLOGER_BANNER,
  payload
})

export const updateAstrologerBanner = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_BANNER,
  payload
})
export const updateAstrologerBannerStatus = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_BANNER_STATUS,
  payload
})

export const deleteAstrologerBanner = payload =>({
  type: actionTypes.DELETE_ASTROLOGER_BANNER,
  payload
})
