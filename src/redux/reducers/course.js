import * as actionTypes from "../actionTypes";

const initialState = {
  courseData: null,
};

const course = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_COURSE: {
      return {
        ...state,
        courseData: payload,
      };
    } 

    case actionTypes.GET_ALL_COURSES: {
      return {
        ...state,
        courseData: payload,
      };
    }
    case actionTypes.UPDATE_PRODUCT_STATUS: {
      
      return {
          ...state,
          courseData: payload,
      };
  }
  case actionTypes.UPDATE_PRODUCT: {
   
    return {
        ...state,
        courseData: payload,
    };
}
  case actionTypes.DELETE_PRODUCT: {
    return {
      ...state,
      courseData: payload,
    };
  }

    default: {
      return state;
    }
  }
};

export default course;
