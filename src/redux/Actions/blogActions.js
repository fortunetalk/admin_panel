import * as actionTypes from "../actionTypes";

export const addBlog = payload => ({
    type: actionTypes.CREATE_BLOG,
    payload
});

export const getBlogs = () => ({
    type: actionTypes.BLOG_LIST
});
export const updateBlog = (category) => ({
    type: actionTypes.UPDATE_BLOG,
    payload:category,
});
export const deleteBlog = (id) => ({
    type: actionTypes.DELETE_BLOG,
    payload: { id },
});
export const deleteMultipleBlog = (ids) => ({
    type: actionTypes.DELETE_MULTIPLE_BLOG,
    payload: { ids },
});

