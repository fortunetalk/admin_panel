import * as actionTypes from "../actionTypes";

export const addBlog = payload =>({
    type: actionTypes.CREATE_BLOG,
    payload
})
export const getBlogs = () =>({
    type: actionTypes.BLOG_LIST,
})
export const updateBlog = payload =>({
    type: actionTypes.UPDATE_BLOG,
    payload
})
export const deleteBlog = payload =>({
    type: actionTypes.DELETE_BLOG,
    payload
})
export const updateBlogStatus = payload =>({
    type: actionTypes.UPDATE_BLOG_STATUS,
    payload
})
export const deleteMultipleBlog = (ids) => ({
    type: actionTypes.DELETE_MULTIPLE_BLOG,
    payload: { ids },
});

