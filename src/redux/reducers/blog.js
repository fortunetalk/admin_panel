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
        isLoading: true,
      };
    }
<<<<<<< HEAD
    case actionTypes.UNSET_IS_LOADING: {
=======
    case actionTypes.UNSET_IS_LOADING:{
>>>>>>> 9ecb6d1b75bf0f3cd77ff4a97198edb13b26b700
      return {
        ...state,
        isLoading: false,
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
