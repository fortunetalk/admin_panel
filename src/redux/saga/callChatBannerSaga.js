
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url, create_call_chat_banner, call_chat_banner_list,update_call_chat_banner, change_call_chat_banner_status, delete_call_chat_banner} from '../../utils/Constants';
import { Colors } from "../../assets/styles";

function* addCallChatBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_call_chat_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Banner Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
      yield put({ type: actionTypes.GET_ALL_CALL_CHAT_BANNER, payload: null});
    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });

    }
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error Occured",
      text: e.message ,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }finally{
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* getAllCallChatBanner() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + call_chat_banner_list,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_CALL_CHAT_BANNER,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateCallChatBannerStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + change_call_chat_banner_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Banner Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_CALL_CHAT_BANNER, payload: response });
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
      console.error('Error Updating Banner Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Banner Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* updateCallChatBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    
    const response = yield ApiRequest.postRequest({
      url: api_url+update_call_chat_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Banner Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CALL_CHAT_BANNER, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Banner Update Failed",
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
function* deleteCallChatBanner(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Banner`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    })
    
    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_call_chat_banner,
        header: "json",
        data: {
          bannerId: payload?.bannerId

        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Banner Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_CALL_CHAT_BANNER, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Banner Deletion Failed",
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
export default function* callChatBannerSaga() {
  yield takeLeading(actionTypes.CREATE_CALL_CHAT_BANNER, addCallChatBanner);
  yield takeLeading(actionTypes.GET_ALL_CALL_CHAT_BANNER, getAllCallChatBanner);
  yield takeLeading(actionTypes.UPDATE_CALL_CHAT_BANNER, updateCallChatBanner);
  yield takeLeading(actionTypes.UPDATE_CALL_CHAT_BANNER_STATUS, updateCallChatBannerStatus);
  yield takeLeading(actionTypes.DELETE_CALL_CHAT_BANNER, deleteCallChatBanner);
}
