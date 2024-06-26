import * as actionTypes from "../actionTypes";

export const addTestimonial = payload =>({
    type: actionTypes.CREATE_TESTIMONIAL,
    payload
})
export const getTestimonial = () =>({
    type: actionTypes.TESTIMONIAL_LIST,
})
export const updateTestimonial = payload =>({
    type: actionTypes.UPDATE_TESTIMONIAL,
    payload
})
export const deleteTestimonial = payload =>({
    type: actionTypes.DELETE_TESTIMONIAL,
    payload
})
export const updateTestimonialStatus = payload =>({
    type: actionTypes.UPDATE_TESTIMONIAL_STATUS,
    payload
})