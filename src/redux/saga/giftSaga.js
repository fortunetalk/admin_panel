import { put, call, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import {
  api_url,
  create_gift,
  gift_list,
  change_gift_status,
  update_gift,
  delete_gift,
} from "../../utils/Constants";
import { Colors } from "../../assets/styles";

function* addGift(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_gift,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Gift Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GIFT_LIST, payload: response });
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

function* getAllGift() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + gift_list,
    });

    if (response) {
      yield put({
        type: actionTypes.GIFT_LIST,
        payload: response?.data.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateGiftStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_gift_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Gift Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GIFT_LIST, payload: response });
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
    console.error("Error Updating Gift Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Gift Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* updateGift(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_gift,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Gift Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GIFT_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Gift Update Failed",
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
function* deleteGift(actions) {
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
        url: api_url + delete_gift,
        header: "json",
        data: {
          giftId: payload?.giftId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Gift Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GIFT_LIST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Gift Deletion Failed",
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
export default function* giftSaga() {
  yield takeLeading(actionTypes.CREATE_GIFT, addGift);
  yield takeLeading(actionTypes.GIFT_LIST, getAllGift);
  yield takeLeading(actionTypes.UPDATE_GIFT, updateGift);
  yield takeLeading(
    actionTypes.UPDATE_GIFT_STATUS,
    updateGiftStatus
  );
  yield takeLeading(actionTypes.DELETE_GIFT, deleteGift);
}
