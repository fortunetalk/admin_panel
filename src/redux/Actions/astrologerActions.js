import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
  type: actionTypes.SET_IS_LOADING,
  payload: true,
});

export const unsetIsLoading = () => ({
  type: actionTypes.UNSET_IS_LOADING,
  payload: false,
});

export const getAllAstrologer = () => ({
  type: actionTypes.GET_ALL_ASTROLOGER,
});

export const getAllActiveAstrologer = () => ({
  type: actionTypes.GET_ALL_ACTIVE_ASTROLOGER,
});

export const getAstrologer = (astrologerId) => ({
  type: actionTypes.GET_ASTROLOGER,
  payload: { astrologerId },

});

export const addAstrologer = payload =>({
  type: actionTypes.ADD_ASTROLOGER,
  payload
})

export const updateAstrologerChatStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS,
  payload,
});

export const updateAstrologerCallStatus = (payload) => ({
  type: actionTypes.UPDATE_ASTROLOER_CALL_STATUS,
  payload,
});

export const getEnquiryAstrologers = payload =>({
  type: actionTypes.GET_ENQUIRY_ASTROLOGERS,
  payload
})

export const setEnquiryAstrologers = payload =>({
  type: actionTypes.SET_ENQUIRY_ASTROLOGERS,
  payload
})

export const updateEnquiryStatus = payload =>({
  type: actionTypes.UPDATE_ENQUIRY_STATUS,
  payload
})

export const updateAstrologerData = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_DATA, 
  payload
})

export const verifyUnverifyAstrologer = payload =>({
  type: actionTypes.VERIFY_UNVERIFY_ASTROLOGER,
  payload
})

export const deleteAstrologer = payload =>({
  type: actionTypes.DELETE_ASTROLOGER,
  payload
})

export const updateAstrologerStatus = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_STATUS, 
  payload
})
export const updateAstrologerSkill = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_SKILL, 
  payload
})
export const updateAstrologerRemedies = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_REMEDIES, 
  payload
})
export const updateAstrologerExperties = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_EXPERTIES, 
  payload
})
export const updateAstrologerAllowedCountry = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_ALLOWED_COUNTRIES, 
  payload
})

export const updateAstrologerPreferredDays = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_PREFERRED_DAYS, 
  payload
})

export const updateAstrologerProfileImage = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_PROFILE_IMAGE, 
  payload
})

export const updateAstrologerBankProofImage = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_BANK_PROOF_IMAGE, 
  payload
})

export const updateAstrologerIdProofImage = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_ID_PROOF_IMAGE, 
  payload
})

export const updateAstrologerGalleryImage = payload =>({
  type: actionTypes.UPDATE_ASTROLOGER_GALLERY_IMAGE, 
  payload
})