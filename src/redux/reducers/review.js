import * as actionTypes from "../actionTypes";

const initialState = {
  astrologersReviews: null,
  appReview: null,
};

const review = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ASTROLOGERS_REVIEWS: {
      return {
        ...state,
        astrologersReviews: payload,
      };
    }

    case actionTypes.SET_APP_REVIEWS: {
      return {
        ...state,
        appReview: payload,
      };
    }

    case actionTypes.SET_APP_REVIEWS: {
      return {
        ...state,
        appReview: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default review;
