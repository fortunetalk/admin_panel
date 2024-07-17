
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url,get_profile_request ,update_profile_request } from '../../utils/Constants';
import { Colors } from "../../assets/styles";


function* getAllProfileRequest() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_profile_request,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_PROFILE_REQUEST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* verifyProfileRequest(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_profile_request,
          header: "application/json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Request Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_PROFILE_REQUEST, payload: response });
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
      console.error('Error Updating Profile Request Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Profile Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getAllPhoneNumberRequest() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_profile_request,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_PROFILE_REQUEST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* verifyPhoneNumberRequest(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_profile_request,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Request Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_PROFILE_REQUEST, payload: response });
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
      console.error('Error Updating Profile Request Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Profile Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

export default function* requestSaga() {
  yield takeLeading(actionTypes.GET_ALL_PROFILE_REQUEST, getAllProfileRequest);
  yield takeLeading(actionTypes.VERIFY_PROFILE_REQUEST, verifyProfileRequest);
  yield takeLeading(actionTypes.GET_ALL_PHONE_NUMBER_REQUEST, getAllPhoneNumberRequest);
  yield takeLeading(actionTypes.VERIFY_PHONE_NUMBER_REQUEST, verifyPhoneNumberRequest);
}
