import * as actionTypes from "../actionTypes";

const initialState = {
  mcqData: null,
  mcqAnswerListData: null,
  isLoading: false,

};

const mcq = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_MCQ: {
      return {
        ...state,
        mcqData: payload,
      };
    } 

    case actionTypes.MCQ_LIST: {
      return {
        ...state,
        mcqData: payload,
      };
    }

    case actionTypes.UPDATE_MCQ: {
      
      return {
          ...state,
          mcqData: payload,
      };
  }
  case actionTypes.UPDATE_MCQ_STATUS: {
   
    return {
        ...state,
        mcqData: payload,
    };
}
  
  case actionTypes.DELETE_MCQ: {
    return {
      ...state,
      mcqData: payload,
    };
  }
  
  case actionTypes.MCQ_ANSWER_LIST: {
    return {
      ...state,
      mcqAnswerListData: payload,
    };
  }

  case actionTypes.SET_IS_LOADING: {
    return {
      ...state,
      isLoading: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default mcq;
