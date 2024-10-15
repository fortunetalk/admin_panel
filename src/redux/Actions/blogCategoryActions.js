// blogCategoryActions.js
import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
    type: actionTypes.SET_IS_LOADING,
    payload: true,
});

export const unsetIsLoading = () => ({
    type: actionTypes.UNSET_IS_LOADING,
    payload: false,
});

export const addBlogCategory = payload => ({
    type: actionTypes.CREATE_BLOG_CATEGORY,
    payload
});

export const getBlogCategory = () => ({
    type: actionTypes.BLOG_CATEGORY_LIST
});

export const updateBlogCategory = (category) => ({
    type: actionTypes.UPDATE_BLOG_CATEGORY,
    payload: category,
});
export const deleteBlogCategory = (blogCategoryId) => ({
    type: actionTypes.DELETE_BLOG_CATEGORY,
    payload: { blogCategoryId },
});
export const activeBlogCategory = () => ({
    type: actionTypes.ACTIVE_BLOG_CATEGORY,

});
