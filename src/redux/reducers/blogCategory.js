import * as actionTypes from "../actionTypes";

const initialState = {
  appBlogCategoryData: null,
  setBlogCategoryData: null,
  updateBlogCategoryData:null,
  deleteBlogCategoryData: null,
  activeBlogCategoryData: null,
};

const blogCategory = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_BLOG_CATEGORY: {
      return {
        ...state,
        setBlogCategoryData: payload,
      };
    }
    case actionTypes.BLOG_CATEGORY_LIST: {
      return {
        ...state,
        appBlogCategoryData: payload,
      };
    }
    case actionTypes.UPDATE_BLOG_CATEGORY: {
      const updatedData = state.appBlogCategoryData.map(category =>
        category._id === payload._id ? payload : category
      );
      return {
        ...state,
        appBlogCategoryData: updatedData,
      };
    }
    case actionTypes.DELETE_BLOG_CATEGORY: {
      const updatedData = state.appBlogCategoryData.filter(category => category._id !== payload);
      return {
        ...state,
        appBlogCategoryData: updatedData,
      };
    }
    case actionTypes.ACTIVE_BLOG_CATEGORY: {
      return {
        ...state,
        activeBlogCategoryData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default blogCategory;
