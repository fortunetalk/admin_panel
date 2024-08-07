
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url,get_profile_request ,update_profile_request, get_phone_request, update_phone_request, get_bank_request, update_bank_request, get_gallery_request, update_gallery_request } from '../../utils/Constants';
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
        yield put({ type: actionTypes.GET_ALL_PROFILE_REQUEST, payload: null });
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
      url: api_url + get_phone_request,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_PHONE_NUMBER_REQUEST,
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
          url: api_url + update_phone_request,
          header: "application/json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Request Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_PHONE_NUMBER_REQUEST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Request Updation Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error Updating Request:', error);
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
function* getBankRequest() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_bank_request,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_BANK_REQUEST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* verifyBankRequest(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_bank_request,
          header: "application/json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Request Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_BANK_REQUEST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Request Updation Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error Updating Request:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Request",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getGalleryRequest() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_gallery_request,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_GALLERY_IMAGE_REQUEST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* verifyGalleryRequest(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_gallery_request,
          header: "application/json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Request Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_GALLERY_IMAGE_REQUEST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Request Updation Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error Updating Request:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Request",
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
  yield takeLeading(actionTypes.GET_ALL_BANK_REQUEST, getBankRequest);
  yield takeLeading(actionTypes.VERIFY_BANK_REQUEST, verifyBankRequest);
  yield takeLeading(actionTypes.GET_ALL_GALLERY_IMAGE_REQUEST, getGalleryRequest);
  yield takeLeading(actionTypes.VERIFY_GALLERY_IMAGE_REQUEST, verifyGalleryRequest);
}
