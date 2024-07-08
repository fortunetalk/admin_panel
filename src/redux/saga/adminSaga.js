import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, admin_login, admin_logout, admin_change_password } from "../../utils/Constants";
import Swal from "sweetalert2";

function* adminLogin(action) {
    try {
        const { payload } = action;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const response = yield call(ApiRequest.postRequest, {
            url: api_url + admin_login,
            header: "application/json",
            data: payload,
        });

        if (response.success) {
            yield put({ type: actionTypes.ADMIN_LOGIN_SUCCESS, payload: response.data });

            Swal.fire({
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 2000,
            });

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        } else {
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
  
      if (!accessToken) {
        throw new Error('No access token found');
      }
  
      const response = yield call(ApiRequest.postRequest, {
        url: api_url + admin_logout,
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${accessToken}` 
        },
        data: {},
      });
      console.log('repsonse',response)
  
      if (response?.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
  
        yield put({ type: actionTypes.ADMIN_LOGOUT_SUCCESS });
  
        Swal.fire({
          icon: 'success',
          title: 'Logout Successful',
          showConfirmButton: false,
          timer: 2000,
        });
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

export default function* adminSaga() {
    yield takeLatest(actionTypes.ADMIN_LOGIN_REQUEST, adminLogin);
    yield takeLatest(actionTypes.ADMIN_LOGOUT_REQUEST, adminLogout);
    yield takeLatest(actionTypes.ADMIN_CHANGE_PASSWORD_REQUEST, adminChangePassword);
}
