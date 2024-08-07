import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  delete_live_stream,
  get_live_stream_list,
  update_live_stream_status,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* getLiveStream() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_live_stream_list,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.LIVE_STREAM_LIST,
        payload: response.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

function* updateLiveStreamStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_live_stream_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.LIVE_STREAM_LIST, payload: response });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (error) {
    console.error("Error Updating Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Status",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}
function* deleteLiveStream(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Live Stream Data`,
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
        url: api_url + delete_live_stream,
        header: "json",
        data: {
          liveStreamId: payload?.liveStreamId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Data Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.LIVE_STREAM_LIST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Data Deletion Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

export default function* liveStreamSaga() {
  yield takeLeading(actionTypes.LIVE_STREAM_LIST, getLiveStream);
  yield takeLeading(actionTypes.DELETE_LIVE_STREAM, deleteLiveStream);
  yield takeLeading(actionTypes.UPDATE_LIVE_STREAM_STATUS, updateLiveStreamStatus);
}
