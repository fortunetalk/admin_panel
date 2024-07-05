import {
  call,
  put,
  race,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  api_url,
  get_astrologer_notification,
  get_customer_notification,
  send_astrologer_notification,
  send_customer_notification,
  delete_customer_notification,
  update_customer_notification,
  update_customer_notification_status,
  update_astrologer_notification_status,
  delete_astrologer_notification,
  update_astrologer_notification,
} from "../../utils/Constants";
import { ApiRequest } from "../../utils/apiRequest";
import * as actionTypes from "../actionTypes";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* getCustomerNotification() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_customer_notification,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_CUSTOMER_NOTIFICATIONS,
        payload: response.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getAstrologerNotification() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_astrologer_notification,
    });
    if (response.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGER_NOTIFICATIONS,
        payload: response.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* sendCustomerNotifications(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + send_customer_notification,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Added Successful",
        text: "Notification Send Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({
        type: actionTypes.GET_CUSTOMER_NOTIFICATIONS,
        payload: null,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Notification Send Failed",
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

function* sendAstrologerNotifications(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + send_astrologer_notification,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Added Successful",
        text: "Notification Send Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({
        type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS,
        payload: null,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Notification Send Failed",
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

function* updateCustomerNotificationStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_customer_notification_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Notification Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_CUSTOMER_NOTIFICATIONS, payload: response });
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
    console.error("Error Updating Notification Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Notification Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateCustomerNotification(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_customer_notification,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Notification Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_CUSTOMER_NOTIFICATIONS, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Notification Update Failed",
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
function* deleteCustomerNotifications(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Notification`,
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
        url: api_url + delete_customer_notification,
        header: "json",
        data: {
          notificationId: payload?.notificationId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Notification Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_CUSTOMER_NOTIFICATIONS, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Notification Delete Failed",
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
function* deleteAstrologerNotifications(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Notification`,
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
        url: api_url + delete_astrologer_notification,
        header: "json",
        data: {
          notificationId: payload?.notificationId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Notification Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Notification Delete Failed",
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

function* updateAstrologerNotificationStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_astrologer_notification_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Notification Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS, payload: response });
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
    console.error("Error Updating Notification Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Notification Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* updateAstrologerNotification(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_astrologer_notification,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Notification Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ASTROLOGER_NOTIFICATIONS, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Notification Update Failed",
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


export default function* notificationSaga() {
  yield takeLeading(
    actionTypes.GET_CUSTOMER_NOTIFICATIONS,
    getCustomerNotification
  );
  yield takeLeading(
    actionTypes.UPDATE_CUSTOMER_NOTIFICATION,
    updateCustomerNotification
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_NOTIFICATION,
    updateAstrologerNotification
  );
  yield takeLeading(
    actionTypes.UPDATE_CUSTOMER_NOTIFICATION_STATUS,
    updateCustomerNotificationStatus
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_NOTIFICATION_STATUS,
    updateAstrologerNotificationStatus
  );
  yield takeLeading(
    actionTypes.DELETE_CUSTOMER_NOTIFICATION,
    deleteCustomerNotifications
  );
  yield takeLeading(
    actionTypes.DELETE_ASTROLOGER_NOTIFICATION,
    deleteAstrologerNotifications
  );
  yield takeLeading(
    actionTypes.GET_ASTROLOGER_NOTIFICATIONS,
    getAstrologerNotification
  );

  yield takeLeading(
    actionTypes.SEND_CUSTOMER_NOTIFICATIONS,
    sendCustomerNotifications
  );
  yield takeLeading(
    actionTypes.SEND_ASTROLOGER_NOTIFICATIONS,
    sendAstrologerNotifications
  );
}
