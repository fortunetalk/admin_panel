import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_remedy,
  api_url,
  delete_remedy,
  get_remedy,
  get_active_remedy,
  update_remedy,
  change_remedy_status,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* getRemedies() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_remedy,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_REMEDIES,
        payload: response.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}
function* getActiveRemedies() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({ 
      url: api_url + get_active_remedy,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_ACTIVE_REMEDIES,
        payload: response.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

function* createRemedies(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_remedy,
      header: "application/json",
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Remedy Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_REMEDIES, payload: response });
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error Occured",
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* updateRemedies(actions) {
  try {
    const { formData, remedy_id } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_remedy + `${remedy_id}`,
      header: "json",
      data: formData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Remedy Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_REMEDIES, payload: response });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Remedy Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}
function* updateRemediesStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_remedy_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Remedy Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_REMEDIES, payload: response });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (error) {
    console.error("Error Updating Remedy Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Remedy Status",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}
function* deleteRemedies(actions) {
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
        url: api_url + delete_remedy,
        header: "json",
        data: {
          remediesId: payload?.remediesId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Remedy Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_REMEDIES, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Remedy Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

export default function* remediesSaga() {
  yield takeLeading(actionTypes.GET_ALL_REMEDIES, getRemedies);
  yield takeLeading(actionTypes.GET_ALL_ACTIVE_REMEDIES, getActiveRemedies);
  yield takeLeading(actionTypes.CREATE_REMEDY, createRemedies);
  yield takeLeading(actionTypes.UPDATE_REMEDY, updateRemedies);
  yield takeLeading(actionTypes.DELETE_REMEDY, deleteRemedies);
  yield takeLeading(actionTypes.CHANGE_REMEDY_STATUS, updateRemediesStatus);
}
