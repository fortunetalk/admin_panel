import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, blog_category_list, create_blog_category, update_blog_category, delete_blog_category, active_blog_category } from "../../utils/Constants";
import Swal from "sweetalert2";

function* createBlogCategory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + create_blog_category,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Category Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.CREATE_BLOG_CATEGORY, payload: response.data });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Category Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to add Blog Category",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING });
  }
}

function* getBlogCategories() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.getRequest({
      url: api_url + blog_category_list,
    });

    if (response?.success) {
      yield put({ type: actionTypes.BLOG_CATEGORY_LIST, payload: response.data.reverse() });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch Blog Categories",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch Blog Categories",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING });
  }
}

function* updateBlogCategory(actions) {
  try {
    const { payload } = actions;
    const { title, id, status } = payload;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_blog_category + `${id}`,
      header: "json",
      data: { title, status },
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Blog Category Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.BLOG_CATEGORY_LIST, payload: response.data });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Blog Category Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update Blog Category",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING });
  }
}

function* deleteBlogCategory(actions) {
  try {
    const { blogCategoryId } = actions.payload;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + delete_blog_category,
      header: 'json',
      data: { blogCategoryId },
    });

    if (response?.success) {
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
    yield put({ type: actionTypes.UNSET_IS_LOADING });
  }
}

function* activeBlogCategories() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.getRequest({
      url: api_url + active_blog_category,
    });

    if (response?.success) {
      yield put({ type: actionTypes.ACTIVE_BLOG_CATEGORY, payload: response.activeCategories });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch Active Blog Categories",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.error(e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch Active Blog Categories",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING });
  }
}

export default function* blogCategorySaga() {
  yield takeLeading(actionTypes.CREATE_BLOG_CATEGORY, createBlogCategory);
  yield takeLeading(actionTypes.BLOG_CATEGORY_LIST, getBlogCategories);
  yield takeLeading(actionTypes.UPDATE_BLOG_CATEGORY, updateBlogCategory);
  yield takeLeading(actionTypes.DELETE_BLOG_CATEGORY, deleteBlogCategory);
  yield takeLeading(actionTypes.ACTIVE_BLOG_CATEGORY, activeBlogCategories);
}
