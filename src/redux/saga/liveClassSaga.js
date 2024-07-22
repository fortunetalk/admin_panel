
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url, live_class_list, create_live_class, change_live_class_status, change_live_class_admin_status, delete_live_class, update_live_class } from '../../utils/Constants';
import { Colors } from "../../assets/styles";


function* addLiveClass(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_live_class,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Live Class Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.LIVE_CLASS_LIST, payload: response });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error Occured",
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* getAllLiveClass() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + live_class_list,
    });

    if (response) {
      yield put({
        type: actionTypes.LIVE_CLASS_LIST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateLiveClassStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_live_class_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Live Class Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.LIVE_CLASS_LIST, payload: response });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
  } catch (error) {
    console.error('Error Updating Live Class Status:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Live Class Status",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}
function* updateLiveClassAdminStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_live_class_admin_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Live Class Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.LIVE_CLASS_LIST, payload: response });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
  } catch (error) {
    console.error('Error Updating Live Class Status:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Live Class Status",
      showConfirmButton: false,
      timer: 2000,
    });

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* updateLiveClass(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_live_class,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Live Class Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({ type: actionTypes.LIVE_CLASS_LIST, payload: null });

      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Live Class Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteLiveClass(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Live Class`,
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
        url: api_url + delete_live_class,
        header: "json",
        data: {
          liveClassId: payload?.liveClassId
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Live Class Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.LIVE_CLASS_LIST, payload: null })
        yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Live Class Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
      }
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }

}

export default function* liveClassSaga() {
  yield takeLeading(actionTypes.CREATE_LIVE_CLASS, addLiveClass);
  yield takeLeading(actionTypes.LIVE_CLASS_LIST, getAllLiveClass);
  yield takeLeading(actionTypes.UPDATE_LIVE_CLASS, updateLiveClass);
  yield takeLeading(actionTypes.UPDATE_LIVE_CLASS_STATUS, updateLiveClassStatus);
  yield takeLeading(actionTypes.UPDATE_LIVE_CLASS_ADMIN_STATUS, updateLiveClassAdminStatus);
  yield takeLeading(actionTypes.DELETE_LIVE_CLASS, deleteLiveClass);
}
