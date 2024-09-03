import * as actionTypes from "../actionTypes";

export const addAstrologesOffers = (payload) => ({
  type: actionTypes.Add_ASTROLOGERS_OFFERS,
  payload,
});

export const getAstrologersOffers = (payload) => ({
  type: actionTypes.GET_ASTROLOGERS_OFFERS,
  payload,
});

export const setAstrologersOffers = (payload) => ({
  type: actionTypes.SET_ASTROLOGERS_OFFERS,
  payload,
});

export const deleteAstrologerOffer = (payload) => ({
  type: actionTypes.DELETE_ASTROLOGER_OFFER,
  payload,
});

export const updateAstrologerOffer = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOGER_OFFER,
  payload,
});

