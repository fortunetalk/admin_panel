import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, blog_category_list, create_blog_category, update_blog_category, delete_blog_category,active_blog_category} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";


function* createBlogCategory(actions) {

  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_blog_category,
      header: "json",
      data: payload,
    });
    // console.log('response',response)

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Category Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.CREATE_BLOG_CATEGORY, payload: response.data})
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Category Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getBlogCategories() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + blog_category_list
    })

    if (response?.success) {
      yield put({ type: actionTypes.BLOG_CATEGORY_LIST, payload: response.data })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateBlogCategory(actions) {
  try {
    const { payload } = actions;
    const {title,id, status} = payload
    console.log('payload',payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_blog_category + `${id}` ,
      header: "json",
      data: {title, status},
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Category Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.BLOG_CATEGORY_LIST, payload: response})
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Category Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete Blog Category",
      showConfirmButton: false,
      timer: 2000,
    });
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* deleteBlogCategory(actions) {
  try {
    const { blogCategoryId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.postRequest, {
      url: api_url + delete_blog_category,
      header: 'json',
      data: { blogCategoryId }, // Pass ID in the request body
    });


    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Category Deleted Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.BLOG_CATEGORY_LIST, payload: blogCategoryId });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Category Deletion Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error('Error deleting Blog Category:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete Blog Category",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* activeBlogCategories() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + active_blog_category
    })

    if (response?.success) {
      yield put({ type: actionTypes.ACTIVE_BLOG_CATEGORY, payload: response?.activeCategories})
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}


export default function* blogCategorySaga() {
  yield takeLeading(actionTypes.CREATE_BLOG_CATEGORY, createBlogCategory)
  yield takeLeading(actionTypes.BLOG_CATEGORY_LIST, getBlogCategories)
  yield takeLeading(actionTypes.UPDATE_BLOG_CATEGORY, updateBlogCategory)
  yield takeLeading(actionTypes.DELETE_BLOG_CATEGORY, deleteBlogCategory)
  yield takeLeading(actionTypes.ACTIVE_BLOG_CATEGORY, activeBlogCategories)
}
