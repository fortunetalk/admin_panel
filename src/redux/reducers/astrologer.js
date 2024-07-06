import * as actionTypes from "../actionTypes";

const initialState = {
  astrologerListData: null,
  activeAstrologerData: null,
  astrologerData: null,
  setAstrologerData: null,
  updateAstrologerStatus: null,
  updateAstrologerSkillData:null,
  updateAstrologerRemediesData:null,
  updateAstrologerExpertiesData:null,
  isLoading: false,
};

const astrologer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
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

    default: {
      return state;
    }
  }
};

export default astrologer;
