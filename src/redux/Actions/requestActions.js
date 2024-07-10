import * as actionTypes from "../actionTypes";

export const getProfileReqesut = (payload) => ({
  type: actionTypes.GET_ALL_PROFILE_REQUEST,
  payload,
});

export const updateProfileRequest = (payload) => ({
  type: actionTypes.VERIFY_PROFILE_REQUEST,
  payload,
});
export const getPhoneReqesut = (payload) => ({
  type: actionTypes.GET_ALL_PHONE_NUMBER_REQUEST,
  payload,
});

export const updatePhoneRequest = (payload) => ({
  type: actionTypes.VERIFY_PHONE_NUMBER_REQUEST,
  payload,
});

export const getBankReqesut = (payload) => ({
  type: actionTypes.GET_ALL_BANK_REQUEST,
  payload,
});

export const updateBankRequest = (payload) => ({
  type: actionTypes.VERIFY_BANK_REQUEST,
  payload,
});
export const getGalleryReqesut = (payload) => ({
  type: actionTypes.GET_ALL_GALLERY_IMAGE_REQUEST,
  payload,
});

export const updateGalleryRequest = (payload) => ({
  type: actionTypes.VERIFY_GALLERY_IMAGE_REQUEST,
  payload,
});