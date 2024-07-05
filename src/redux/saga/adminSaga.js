import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, admin_login, admin_logout, admin_change_password } from "../../utils/Constants";
import Swal from "sweetalert2";

function* adminLogin(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield call(ApiRequest.postRequest, {
            url: api_url + admin_login,
            header: "json",
            data: payload,
        });

        if (response.success) {
            // Handle successful login
            yield put({ type: actionTypes.ADMIN_LOGIN_SUCCESS, payload: response.data });

            Swal.fire({
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 2000,
            });

            // Example: Save tokens to local storage
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
        } else {
            // Handle login failure
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid credentials or server error",
                showConfirmButton: false,
                timer: 2000,
            });
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
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* adminLogout() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        // Get tokens from local storage
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        // Call API to logout
        const response = yield call(ApiRequest.postRequest, {
            url: api_url + admin_logout,
            header: "json",
            data: {}, 
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.success) {
            // Clear tokens from local storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            yield put({ type: actionTypes.ADMIN_LOGOUT_SUCCESS });

            Swal.fire({
                icon: "success",
                title: "Logout Success",
                showConfirmButton: false,
                timer: 2000,
            });
        } else {
            throw new Error(response?.message || "Logout failed");
        }
    } catch (error) {
        console.error('Error logging out:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Failed to log out",
            showConfirmButton: false,
            timer: 2000,
        });
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* adminChangePassword(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const response = yield call(ApiRequest.postRequest, {
            url: api_url + admin_change_password,
            header: "json",
            data: payload,
        });

        if (response.success) {
            // Handle successful password change
            Swal.fire({
                icon: "success",
                title: "Password Changed Successfully",
                showConfirmButton: false,
                timer: 2000,
            });
            yield put({ type: actionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS });
        } else {
            // Handle password change failure
            Swal.fire({
                icon: "error",
                title: "Password Change Failed",
                text: "Server error or invalid input",
                showConfirmButton: false,
                timer: 2000,
            });
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
    } finally {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

export default function* adminSaga() {
    yield takeLatest(actionTypes.ADMIN_LOGIN_REQUEST, adminLogin);
    yield takeLatest(actionTypes.ADMIN_LOGOUT_REQUEST, adminLogout);
    yield takeLatest(actionTypes.ADMIN_CHANGE_PASSWORD_REQUEST, adminChangePassword);
}
