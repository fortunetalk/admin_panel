import * as actionTypes from "../actionTypes";

const initialState = {
  testimonialData: null,
};

const testimonial = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_TESTIMONIAL: {
      return {
        ...state,
        testimonialData: payload,
      };
    } 

    case actionTypes.TESTIMONIAL_LIST: {
      return {
        ...state,
        testimonialData: payload,
      };
    }
    case actionTypes.UPDATE_TESTIMONIAL: {
      
      return {
          ...state,
          testimonialData: payload,
      };
  }
  case actionTypes.UPDATE_TESTIMONIAL_STATUS: {
   
    return {
        ...state,
        testimonialData: payload,
    };
}
  case actionTypes.DELETE_TESTIMONIAL: {
    return {
      ...state,
      testimonialData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default testimonial;
