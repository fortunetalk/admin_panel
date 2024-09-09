import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_call_discussion,
  api_url,
  delete_call_discussion,
  get_call_discussion,
  update_call_discussion,

} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* addCallDiscussion(actions) {
  try {
    const { body,onAdd } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_call_discussion,
      header: "json",
      data: body,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: response?.message,
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(onAdd);
      yield put({ type: actionTypes.GET_CALL_DISCUSSION, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: response?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getCallDiscussion() {
    try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.getRequest({
        url: api_url + get_call_discussion,
      });
  
      if (response?.success) {
        yield put({
          type: actionTypes.SET_CALL_DISCUSSION,
          payload: response?.data.reverse(),
        });
      }
  
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      console.log(e);
    }
}


function* updateCallDiscussion(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_call_discussion,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Recharge Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_CALL_DISCUSSION, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Recharge Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

function* deleteCallDiscussion(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to delete this plan.`,
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
        url: api_url + delete_call_discussion,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_CALL_DISCUSSION, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: response?.message,
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




export default function* callDiscussionSaga() {
  yield takeLeading(actionTypes.ADD_CALL_DISCUSSION, addCallDiscussion);
  yield takeLeading(actionTypes.GET_CALL_DISCUSSION, getCallDiscussion);
  yield takeLeading(actionTypes.UPDATE_CALL_DISCUSSION, updateCallDiscussion);
  yield takeLeading(actionTypes.DELETE_CALL_DISCUSSION, deleteCallDiscussion)

}
