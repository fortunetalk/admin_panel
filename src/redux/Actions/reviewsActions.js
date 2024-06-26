import * as actionTypes from "../actionTypes";

export const getAstrologersReviews = (payload) => ({
  type: actionTypes.GET_ASTROLOGERS_REVIEWS,
  payload,
});

export const getAppReviews = (payload) => ({
  type: actionTypes.GET_APP_REVIEWS,
  payload,
});

export const setAstrologersReviews = (payload) => ({
  type: actionTypes.GET_ASTROLOGERS_REVIEWS,
  payload,
});

export const setAppReviews = (payload) => ({
  type: actionTypes.SET_APP_REVIEWS,
  payload,
});

export const updateAstrologerReviewStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOER_REVIEW_STATUS,
  payload,
});

export const deleteAstrologerReivew = (payload) => ({
  type: actionTypes.DELETE_ASTROLOGER_REVIEW,
  payload,
});
