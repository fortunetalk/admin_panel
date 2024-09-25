import * as actionTypes from "../actionTypes";

const initialState = {
    calllDiscussionData: null,
};

const callDiscussion = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_CALL_DISCUSSION: {
      return {
        ...state,
        calllDiscussionData : payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default callDiscussion;
