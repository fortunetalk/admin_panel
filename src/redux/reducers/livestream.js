import * as actionTypes from "../actionTypes";

const initialState = {
  liveStreamData: null,
  isLoading: false,
};
 
const liveStream = (state = initialState, actions) => {
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
   
    case actionTypes.LIVE_STREAM_LIST: {
      return {
        ...state,
        liveStreamData: payload,
      };
    }
 
    case actionTypes.UPDATE_LIVE_STREAM_STATUS: {
        return {
            ...state,
            liveStreamData: payload,
          };
    }
   
    case actionTypes.DELETE_LIVE_STREAM: {
       
        return {
            ...state,
            liveStreamData: payload,
        };
    }

    default: { 
      return state;
    }
  }
};

export default liveStream;
