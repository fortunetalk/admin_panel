import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, admin_login, admin_logout, admin_change_password, subadmin_add, get_all_subadmin, subadmin_delete, subadmin_update } from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* adminLogin(action) {
  try {
    const { data, navigate } = action.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + admin_login,
      header: "application/json",
      data: data,
    });

    if (response.success) {
      yield put({ type: actionTypes.ADMIN_LOGIN_SUCCESS, payload: response.data });

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
      });

    } else if (response.success && response.type) {
      
      yield put({ type: actionTypes.SET_ADMIN_TYPE, payload: response.data.type });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

  }  else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: response.message || "Invalid credentials or server error",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.ADMIN_LOGIN_FAILURE, error: response.message });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to log in",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.ADMIN_LOGIN_FAILURE, error: error.message });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* adminLogout() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken", accessToken);
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + admin_logout,
      header: 'json',
      data: {},
      token: accessToken,
    });


    console.log('response', response);

    if (response?.success) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      yield put({ type: actionTypes.ADMIN_LOGOUT_SUCCESS });


    } else {
      throw new Error(response?.message || 'Logout failed');
    }
  } catch (error) {
    console.error('Error logging out:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Failed to log out',
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.ADMIN_LOGOUT_FAILURE, error: error.message });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* adminChangePassword(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + admin_change_password,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Password Changed Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS });
    } else {
      Swal.fire({
        icon: "error",
        title: "Password Change Failed",
        text: response.message || "Server error or invalid input",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.ADMIN_CHANGE_PASSWORD_FAILURE, error: response.message });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to change password",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.ADMIN_CHANGE_PASSWORD_FAILURE, error: error.message });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* subadminAdd(actions) {
  try {
    const {data, onAdd } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING , payload: false });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + subadmin_add,
      header: "json",
      data: data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Sub-Admin Added Successfully",
        text: response?.message ,
        showConfirmButton: false,
        timer: 2000,
      },

    );
      yield put({ type: actionTypes.GET_ALL_SUBADMIN, payload: null });
      yield call(onAdd);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: response?.message ,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log("error", e);
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });

  }
}
function* getAllSubadmin() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_all_subadmin,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ALL_SUBADMIN,
        payload: response?.data.reverse(),
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* subadminDelete(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: "Are you sure to delete this Sub-Admin",
      text: "This Sub-Admin will be removed ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: "Delete",
    });

    if (result?.isConfirmed) {
      // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield call(ApiRequest.postRequest, {
        url: api_url + subadmin_delete,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Sub-Admin has been deleted.",
          icon: "success",
        });
        yield put({ type: actionTypes.GET_ALL_SUBADMIN, payload: null });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the Sub-Admin",
          icon: "error",
        });
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* subadminUpdate(actions) {
  const {payload} = actions;
  try {
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + subadmin_update,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Sub-Admin Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_SUBADMIN, payload: response });
      // yield call(onAdd);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Sub-Admin",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

export default function* adminSaga() {
  yield takeLatest(actionTypes.ADMIN_LOGIN_REQUEST, adminLogin);
  yield takeLatest(actionTypes.ADMIN_LOGOUT_REQUEST, adminLogout);
  yield takeLatest(actionTypes.ADMIN_CHANGE_PASSWORD_REQUEST, adminChangePassword);
  yield takeLatest(actionTypes.SUBADMIN_ADD, subadminAdd);
  yield takeLatest(actionTypes.GET_ALL_SUBADMIN, getAllSubadmin);
  yield takeLatest(actionTypes.SUBADMIN_DELETE, subadminDelete);
  yield takeLatest(actionTypes.SUBADMIN_UPDATE, subadminUpdate);
}
