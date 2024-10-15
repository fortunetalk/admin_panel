import * as actionTypes from "../actionTypes";

const initialState = {
 offerData: null,
};

const offers = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ASTROLOGERS_OFFERS: {
      return {
        ...state,
        offerData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default offers;
