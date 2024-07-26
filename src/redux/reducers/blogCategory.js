import * as actionTypes from "../actionTypes";

const initialState = {
  appBlogCategoryData: [],
  setBlogCategoryData: null,
  updateBlogCategoryData: null,
  deleteBlogCategoryData: null,
  activeBlogCategoryData: null,
  isLoading: false,

};

const blogCategory = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.UNSET_IS_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionTypes.CREATE_BLOG_CATEGORY: {
      return {
        ...state,
        setBlogCategoryData: payload,
        isLoading: false,
      };
    }
    case actionTypes.BLOG_CATEGORY_LIST: {
      return {
        ...state,
        appBlogCategoryData: payload,
        isLoading: false,
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
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default blogCategory;
