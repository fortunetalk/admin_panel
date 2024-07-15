import { put, call, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import {
  api_url,
  create_privacy_policy,
  privacy_policy_list,
  change_privacy_policy_status,
  update_privacy_policy,
  delete_privacy_policy
} from "../../utils/Constants";
import { Colors } from "../../assets/styles";

function* addPrivacyPolicy(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_privacy_policy,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Privacy Policy Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.PRIVACY_POLICY_LIST, payload: response });
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
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAllPrivacyPolicy() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + privacy_policy_list,
    });
    console.log('response',response)

    if (response) {
      yield put({
        type: actionTypes.PRIVACY_POLICY_LIST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updatePrivacyPolicyStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_privacy_policy_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Privacy Policy Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.PRIVACY_POLICY_LIST, payload: response });
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
    console.error("Error Updating Privacy Policy Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Privacy Policy Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* updatePrivacyPolicy(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_privacy_policy,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Privacy Policy Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.PRIVACY_POLICY_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Privacy Policy Update Failed",
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
function* deletePrivacyPolicy(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete`,
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
        url: api_url + delete_privacy_policy,
        header: "json",
        data: {
            privacyId: payload?.privacyId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Privacy Policy Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.PRIVACY_POLICY_LIST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Privacy Policy Deletion Failed",
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
export default function* privacyPolicySaga() {
  yield takeLeading(actionTypes.CREATE_PRIVACY_POLICY, addPrivacyPolicy);
  yield takeLeading(actionTypes.PRIVACY_POLICY_LIST, getAllPrivacyPolicy);
  yield takeLeading(actionTypes.UPDATE_PRIVACY_POLICY, updatePrivacyPolicy);
  yield takeLeading(
    actionTypes.UPDATE_PRIVACY_POLICY_STATUS,
    updatePrivacyPolicyStatus
  );
  yield takeLeading(actionTypes.DELETE_PRIVACY_POLICY, deletePrivacyPolicy);
}
