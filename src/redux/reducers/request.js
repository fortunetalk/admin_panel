import * as actionTypes from "../actionTypes";

const initialState = {
  profileRequestData: [],
  phoneNumberRequestData:[],
  bankRequestData:null,
  galleryRequestData:null,
  isLoading: false,
};

const request = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    } 

    case actionTypes.GET_ALL_PROFILE_REQUEST: {
      return {
        ...state,
        profileRequestData: payload,
      };
    }
    case actionTypes.VERIFY_PROFILE_REQUEST: {
      
      return {
          ...state,
          profileRequestData: payload,
      };
  }

    case actionTypes.GET_ALL_PHONE_NUMBER_REQUEST: {
      return {
        ...state,
        phoneNumberRequestData: payload,
      };
    }
    case actionTypes.VERIFY_PHONE_NUMBER_REQUEST: {
      
      return {
          ...state,
          phoneNumberRequestData: payload,
      };
  }

  
    case actionTypes.GET_ALL_BANK_REQUEST: {
      return {
        ...state,
        bankRequestData: payload,
      };
    }
    case actionTypes.VERIFY_BANK_REQUEST: {
      
      return {
          ...state,
          bankRequestData: payload,
      };
  }


    case actionTypes.GET_ALL_GALLERY_IMAGE_REQUEST: {
      return {
        ...state,
        galleryRequestData: payload,
      };
    }
    case actionTypes.VERIFY_GALLERY_IMAGE_REQUEST: {
      
      return {
          ...state,
          galleryRequestData: payload,
      };
  }
  

    default: {
      return state;
    }
  }
};

export default request;
