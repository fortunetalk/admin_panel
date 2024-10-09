import * as actionTypes from "../actionTypes";
import internationalPricingSaga from "../saga/internationalPricingSaga";

const initialState = {
    internationalPricingData: null,
};

const internationalPricing = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_INTERNATIONAL_PRICE: {
      return {
        ...state,
        internationalPricingData : payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default internationalPricing;
