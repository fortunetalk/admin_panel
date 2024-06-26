import * as actionTypes from "../actionTypes";

const initialState = {

  astrologerListData:null,
  astrologerData:null,
  setAstrologerData:null,
  updateAstrologerStatus:null,
};

const astrologer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
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
      const updatedAstrologers = state.astrologerListData?.map(astrologer =>
          astrologer._id === astrologerId ? { ...astrologer, status } : astrologer
      );
      return {
          ...state,
          astrologerListData: updatedAstrologers,
      };
  }

    case actionTypes.UPDATE_ASTROLOER_CALL_STATUS: {
      const { astrologerId, callStatus } = payload;
      const updatedAstrologers = state.astrologerListData?.map(astrologer =>
          astrologer._id === astrologerId ? { ...astrologer, callStatus } : astrologer
      );
      return {
          ...state,
          astrologerListData: updatedAstrologers,
      };
  }
    case actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS: {
      const { astrologerId, chatStatus } = payload;
      const updatedAstrologers = state.astrologerListData?.map(astrologer =>
          astrologer._id === astrologerId ? { ...astrologer, chatStatus } : astrologer
      );
      return {
          ...state,
          astrologerListData: updatedAstrologers,
      };
  }
  
    default: {
      return state;
    }
  }
};

export default astrologer;
