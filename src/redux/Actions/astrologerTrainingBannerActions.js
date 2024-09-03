import * as actionTypes from "../actionTypes";

export const getAstrologerTrainingBannerData = (payload) => ({
  type: actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER,
  payload,
});


export const createAstrologerTrainingBanner = payload =>({
  type: actionTypes.CREATE_ASTROLOGER_TRAINING_BANNER,
  payload
})

export const updateAstrologerTrainingBanner = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_TRAINING_BANNER,
  payload
})
export const updateAstrologerTrainingBannerStatus = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_TRAINING_BANNER_STATUS,
  payload
})

export const deleteAstrologerTrainingBanner = payload =>({
  type: actionTypes.DELETE_ASTROLOGER_TRAINING_BANNER,
  payload
})
