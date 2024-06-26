import * as actionTypes from "../actionTypes";

const initialState = {
  appBlogData: null,
  setBlogData:null,
  updateBlogData:null,
  deleteBlogData:null,
};

const blog = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_BLOG: {
      return {
        ...state,
        setBlogData: payload,
      };
    }
    case actionTypes.BLOG_LIST: {
      return {
        ...state,
        appBlogData: payload,
      };
    }
    case actionTypes.UPDATE_BLOG: {
      const updatedData = state.appBlogData.map(category =>
        category._id === payload._id ? payload : category
      );
      return {
        ...state,
        appBlogData: updatedData,
      };
    }
    case actionTypes.DELETE_BLOG: {
      const updatedData = state.appBlogData.filter(category => category._id !== payload);
      return {
        ...state,
        appBlogData: updatedData,
      };
    }
    case actionTypes.DELETE_MULTIPLE_BLOG: {
      const updatedData = state.appBlogData.filter(category => category._id !== payload);
      return {
        ...state,
        appBlogData: updatedData,
      };
    }

    default: {
      return state;
    }
  }
};

export default blog;
