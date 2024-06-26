import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_banner,
  get_banners,
  change_redirect_banner_status,
  delete_banner,
  update_banner,
  api_url,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* addRedirectionBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Redirection Banner Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: response });
    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: response.error });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error Occured",
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: e });
  }
}
function* getRedirectionBanner() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_banners,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_REDIRECTION_BANNER,
        payload: response.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: response.data });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateRedirectionBanner(actions) {
  try {
    const { formData } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_banner,
      header: "json",
      data: formData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Redirect Banner Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_REDIRECTION_BANNER, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Redirect Banner Update Failed",
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
function* deleteRedirectionBanner(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.title}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_banner,
        header: "json",
        data: {
          bannerId: payload?.bannerId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Redirection Banner Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_REDIRECTION_BANNER, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Redirection Banner Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateRedirectBannerStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_redirect_banner_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Redirection Banner Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({
        type: actionTypes.GET_REDIRECTION_BANNER,
        payload: response,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Error Updating Redirection Banner Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Redirection Banner Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* bannerSaga() {
  yield takeLeading(actionTypes.GET_REDIRECTION_BANNER, getRedirectionBanner);
  yield takeLeading(
    actionTypes.CREATE_REDIRECTION_BANNER,
    addRedirectionBanner
  );
  yield takeLeading(
    actionTypes.UPDATE_REDIRECTION_BANNER,
    updateRedirectionBanner
  );
  yield takeLeading(
    actionTypes.DELETE_REDIRECTION_BANNER,
    deleteRedirectionBanner
  );
  yield takeLeading(
    actionTypes.CHANGE_REDIRECTION_BANNER_STATUS,
    updateRedirectBannerStatus
  );
}
