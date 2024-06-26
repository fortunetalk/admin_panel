import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, blog_list, create_blog, update_blog, delete_blog, delete_multiple_blog} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";


function* createBlog(actions) {

  try {
    const { payload } = actions;
    console.log('saga payload',payload)
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_blog,
      header: "json",
      data: payload,
    });
    console.log('response',response)

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Category Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.CREATE_BLOG, payload: response.data})
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
function* getBlogs() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + blog_list
    })

    if (response?.success) {
      yield put({ type: actionTypes.BLOG_LIST, payload: response?.Blog })
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateBlog(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_blog,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.UPDATE_BLOG, payload: response})
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Update Blog",
      showConfirmButton: false,
      timer: 2000,
    });
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* deleteBlog(actions) {
  try {
    const { id } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.postRequest, {
      url: api_url + delete_blog,
      header: 'json',
      data: { id }, // Pass ID in the request body
    });


    if (response) {
      Swal.fire({
        icon: "success",
        title: "Blog Deleted Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.DELETE_BLOG, payload: id });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Deletion Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error('Error deleting Blog :', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete Blog ",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* deleteMultipleBlog(actions) {
  try {
    const { ids } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.postRequest, {
      url: api_url + delete_multiple_blog,
      header: 'json',
      data: { ids },
    });

    if (response) {
      Swal.fire({
        icon: "success",
        title: "Blog Deleted Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.DELETE_MULTIPLE_BLOG, payload: ids });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blogs Deletion Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error('Error deleting Blogs :', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to delete Blogs ",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}



export default function* blogSaga() {
  yield takeLeading(actionTypes.CREATE_BLOG, createBlog)
  yield takeLeading(actionTypes.BLOG_LIST, getBlogs)
  yield takeLeading(actionTypes.UPDATE_BLOG, updateBlog)
  yield takeLeading(actionTypes.DELETE_BLOG, deleteBlog)
  yield takeLeading(actionTypes.DELETE_MULTIPLE_BLOG, deleteMultipleBlog)
}
