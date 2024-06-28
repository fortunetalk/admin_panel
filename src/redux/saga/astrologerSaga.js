import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_astrologer,
  api_url,
  change_enquiry_status,
  delete_astrologer,
  get_all_astrologers,
  get_enquired_astrologer,
  update_astrologer,
  verify_astrologer,
  get_astrologer,
  update_astrologer_status,
  update_astrologer_call_status,
  update_astrologer_chat_status,
  get_all_active_astrologers
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function extractErrorMessage(html) {
  console.log('html',html)
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const pre = doc.querySelector('pre');
  return pre ? pre.textContent : 'Failed to add Astrologer';
}

function* addAstrologer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + add_astrologer,
      header: "form",
      data: payload?.data,
    });

    if (response) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: response });
      yield call(payload.callback);
    } else {
      const errorMessage = extractErrorMessage(response?.Error?.message || 'Failed to add Astrologer');

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log("error", e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({  
      url: api_url + get_all_astrologers,
    });

    if (response.success) {
      yield put({
        type: actionTypes.GET_ALL_ASTROLOGER,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: response.data });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getActiveAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({  
      url: api_url + get_all_active_astrologers,
    });

    if (response.success) {
      yield put({
        type: actionTypes.GET_ALL_ACTIVE_ASTROLOGER,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: response.data });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getAstrologer(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { astrologerId } = action.payload;
    const response = yield ApiRequest.getRequest({  
      url:  api_url+`admin/astrologers/${astrologerId}`,
    });

    if (response.success) {
      yield put({
        type: actionTypes.GET_ASTROLOGER,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: response.data });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getEnquiryAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_enquired_astrologer,
    });

    console.log(response);

    if (response.success) {
      yield put({
        type: actionTypes.SET_ENQUIRY_ASTROLOGERS,
        payload: response?.enquiredAstrologer,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateAstrologerStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_astrologer_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.UPDATE_ASTROLOGER_STATUS, payload: response });
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
      console.error('Error Updating Astrologer Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Astrologer Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateAstrologerCallStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_astrologer_call_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Call Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.UPDATE_ASTROLOER_CALL_STATUS, payload: response });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Call Status Updation Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error Updating Astrologer Call Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Astrologer Call Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* updateAstrologerChatStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_astrologer_chat_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Chat Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS, payload: response });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Chat Status Updation Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error Updating Astrologer Chat Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Astrologer Chat Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* updateEnquiryStatus(actions) {
  try {
    const { payload } = actions;

    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log("hii");
    const response = yield ApiRequest.postRequest({
      url: api_url + change_enquiry_status,
      header: "json",
      data: payload,
    });

    console.log(response);

    yield put({ type: actionTypes.GET_ENQUIRY_ASTROLOGERS });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateAstrologerData(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_astrologer,
      header: "form",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add Astrologer",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    console.log(response);

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* verifyUnverifyAstrologer(actions) {
  try {
    const { payload } = actions;
    console.log(payload);

    const result = yield Swal.fire({
      title: `Are you sure to ${payload?.isVerified == 'false' ? 'Unverified' : 'Verified'} this Astrologer`,
      text: "This Astrologer will be verified for active in App",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: `${payload?.isVerified == 'false' ? 'Unverified' : 'Verified'}`,
    });

    if (result?.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + verify_astrologer,
        header: "json",
        data: payload,
      });

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Status Changed",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_ASTROLOGER, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Status Change failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
} 

function* deleteAstrologer(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: "Are you sure to delete this Astrologer",
      text: "This Astrologer will be verified for active in App",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: "Delete",
    });

    if (result?.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
        url: api_url + delete_astrologer,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Astrologer has been deleted.",
          icon: "success",
        });
        yield put({type: actionTypes.GET_ALL_ASTROLOGER, payload: null})
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the AStrologer",
          icon: "error",
        });
      }
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* astrologerSaga() {
  yield takeLeading(actionTypes.GET_ALL_ASTROLOGER, getAstrologers);
  yield takeLeading(actionTypes.GET_ALL_ACTIVE_ASTROLOGER, getActiveAstrologers);
  yield takeLeading(actionTypes.GET_ASTROLOGER, getAstrologer);
  yield takeLeading(actionTypes.GET_ENQUIRY_ASTROLOGERS, getEnquiryAstrologers);
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS,
    updateAstrologerChatStatus
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOER_CALL_STATUS,
    updateAstrologerCallStatus
  );
  yield takeLeading(actionTypes.UPDATE_ENQUIRY_STATUS, updateEnquiryStatus);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_DATA, updateAstrologerData);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_STATUS, updateAstrologerStatus);
  yield takeLeading(actionTypes.ADD_ASTROLOGER, addAstrologer);
  yield takeLeading(
    actionTypes.VERIFY_UNVERIFY_ASTROLOGER,
    verifyUnverifyAstrologer
  );
  yield takeLeading(actionTypes.DELETE_ASTROLOGER, deleteAstrologer)
}
