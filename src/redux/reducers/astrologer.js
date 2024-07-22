import * as actionTypes from "../actionTypes";

const initialState = {
  astrologerListData: null,
  activeAstrologerData: null,
  astrologerData: null,
  setAstrologerData: null,
  updateAstrologerStatus: null,
  updateAstrologerSkillData: null,
  updateAstrologerRemediesData: null,
  updateAstrologerExpertiesData: null,
  updateAstrologerAllowedCountriesData: null,
  updateAstrologerPreferredDaysData: null,
  updateAstrologerProfileImage: null,
  updateAstrologerBankImage: null,
  updateAstrologerIdImage: null,
  updateAstrologerGalleryImage: null,
  updateAstrologerAstrologerType: null,
  setAstrologer: null,
  isLoading: false,
};

const astrologer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.UNSET_IS_LOADING:{
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionTypes.SET_ASTROLOGER: {
      return {
        ...state,
        setAstrologerData: payload,
      };
    }
    case actionTypes.ADD_ASTROLOGER: {
      return {
        ...state,
        setAstrologerData: payload,
      };
    }

    case actionTypes.GET_ALL_ASTROLOGER: {
      return {
        ...state,
        astrologerListData: payload,
      };
    }
    case actionTypes.GET_ALL_ACTIVE_ASTROLOGER: {
      return {
        ...state,
        activeAstrologerData: payload,
      };
    }
    case actionTypes.GET_ASTROLOGER: {
      return {
        ...state,
        astrologerData: payload,
      };
    }
    case actionTypes.SET_ENQUIRY_ASTROLOGERS: {
      return {
        ...state,
        enquiryAstroData: payload,
      };
    }

    case actionTypes.UPDATE_ASTROLOGER_DATA: {
      return {
        ...state,
        astrologerListData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_STATUS: {
      const { astrologerId, status } = payload;
      const updatedAstrologers = state.astrologerListData?.map((astrologer) =>
        astrologer._id === astrologerId ? { ...astrologer, status } : astrologer
      );
      return {
        ...state,
        astrologerListData: updatedAstrologers,
      };
    }

    case actionTypes.UPDATE_ASTROLOER_CALL_STATUS: {
      const { astrologerId, callStatus } = payload;
      const updatedAstrologers = state.astrologerListData?.map((astrologer) =>
        astrologer._id === astrologerId
          ? { ...astrologer, callStatus }
          : astrologer
      );
      return {
        ...state,
        astrologerListData: updatedAstrologers,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS: {
      const { astrologerId, chatStatus } = payload;
      const updatedAstrologers = state.astrologerListData?.map((astrologer) =>
        astrologer._id === astrologerId
          ? { ...astrologer, chatStatus }
          : astrologer
      );
      return {
        ...state,
        astrologerListData: updatedAstrologers,
      };
    }

    case actionTypes.UPDATE_ASTROLOGER_SKILL: {
      return {
        ...state,
        updateAstrologerSkillData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_REMEDIES: {
      return {
        ...state,
        updateAstrologerRemediesData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_EXPERTIES: {
      return {
        ...state,
        updateAstrologerExpertiesData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_ALLOWED_COUNTRIES: {
      return {
        ...state,
        updateAstrologerAllowedCountriesData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_PREFERRED_DAYS: {
      return {
        ...state,
        updateAstrologerPreferredDaysData: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_PROFILE_IMAGE: {
      return {
        ...state,
        updateAstrologerProfileImage: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_BANK_PROOF_IMAGE: {
      return {
        ...state,
        updateAstrologerBankImage: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_ID_PROOF_IMAGE: {
      return {
        ...state,
        updateAstrologerIdImage: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_GALLERY_IMAGE: {
      return {
        ...state,
        updateAstrologerGalleryImage: payload,
      };
    }
    case actionTypes.UPDATE_ASTROLOGER_ASTROLOGER_TYPE: {
      return {
        ...state,
        updateAstrologerAstrologerType: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default astrologer;
