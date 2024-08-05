
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url, demo_class_list, create_demo_class, change_demo_class_status, change_demo_class_admin_status, delete_demo_class, update_demo_class, change_demo_class_ongoing_status, booked_demo_class } from '../../utils/Constants';
import { Colors } from "../../assets/styles";


function* addDemoClass(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_demo_class,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Demo Class Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
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
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
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
  }
}

function* getAllDemoClass() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + demo_class_list,
    });


    if (response) {
      yield put({
        type: actionTypes.DEMO_CLASS_LIST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}
function* updateDemoClassStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_demo_class_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Demo Class Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.DEMO_CLASS_LIST, payload: response });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } catch (error) {
    console.error('Error Updating Demo Class Status:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Demo Class Status",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}
function* updateDemoClassAdminStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_demo_class_admin_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Admin Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.DEMO_CLASS_LIST, payload: response });
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
    console.error('Error Updating Admin Status:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Admin Status",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* updateDemoClassOngoingStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_demo_class_ongoing_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Demo Class Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.DEMO_CLASS_LIST, payload: response });
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
function* updateDemoClass(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_demo_class,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Demo Class Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.DEMO_CLASS_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Demo Class Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* deleteDemoClass(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Demo Class`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    })

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_demo_class,
        header: "json",
        data: {
          demoClassId: payload?.demoClassId

        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Demo Class Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.DEMO_CLASS_LIST, payload: null })

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Demo Class Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* getAllBookedDemoClass() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + booked_demo_class,
    });


    if (response) {
      yield put({
        type: actionTypes.BOOKED_DEMO_CLASS_LIST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

export default function* demoClassSaga() {
  yield takeLeading(actionTypes.CREATE_DEMO_CLASS, addDemoClass);
  yield takeLeading(actionTypes.DEMO_CLASS_LIST, getAllDemoClass);
  yield takeLeading(actionTypes.UPDATE_DEMO_CLASS, updateDemoClass);
  yield takeLeading(actionTypes.UPDATE_DEMO_CLASS_STATUS, updateDemoClassStatus);
  yield takeLeading(actionTypes.UPDATE_DEMO_CLASS_ADMIN_STATUS, updateDemoClassAdminStatus);
  yield takeLeading(actionTypes.UPDATE_DEMO_CLASS_ONGOING_STATUS, updateDemoClassOngoingStatus);
  yield takeLeading(actionTypes.DELETE_DEMO_CLASS, deleteDemoClass);
  yield takeLeading(actionTypes.BOOKED_DEMO_CLASS_LIST, getAllBookedDemoClass);
}
