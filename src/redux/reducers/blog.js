import * as actionTypes from "../actionTypes";

const initialState = {
  appBlogData: null,
  isLoading: false,
};

const blog = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case actionTypes.CREATE_BLOG: {
      return {
        ...state,
        appBlogData: payload,
      };
    }
    case actionTypes.BLOG_LIST: {
      return {
        ...state,
        appBlogData: payload,
      };
    }
    case actionTypes.UPDATE_BLOG: {
      return {
        ...state,
        appBlogData: payload,
      };
    }
    case actionTypes.DELETE_BLOG: {
      return {
        ...state,
        appBlogData: payload,
      };
    }
    case actionTypes.DELETE_MULTIPLE_BLOG: {
      return {
        ...state,
        appBlogData: payload,
      };
    }
    case actionTypes.UPDATE_BLOG_STATUS: {
      return {
        ...state,
        appBlogData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default blog;
