import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import {
  api_url,
  get_call_history,
  get_chat_history,
  get_recharge_history,
  get_demo_class_history,
  change_demo_class_history_status,
  delete_demo_class_history,
  get_live_class_history,
  change_live_class_history_status,
  delete_live_class_history,
  get_live_course_history,
  change_live_course_history_status,
  get_register_live_class_history,
  delete_chat_history,
  delete_call_history

} from "../../utils/Constants";
import { database, firestore } from "../../config/firbase";
import { get, onValue, ref } from "firebase/database";
import { Colors } from "../../assets/styles";
import { doc, getDoc, collection, orderBy, query, onSnapshot, getDocs } from "firebase/firestore";


function* getChatHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_chat_history,
    });


    if (response?.success) {
      yield put({
        type: actionTypes.SET_CHAT_HISTORY,
        payload: response?.data?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

async function fetchCustomerFirebaseID(firebaseID) {
  try {
    // Assuming you have a function to fetch customerFirebaseID from Firebase

    const customerFirebaseID = await get(ref(database, 'UserId/' + firebaseID));
    return customerFirebaseID?.val();
  } catch (error) {
    throw error;
  }
}

async function fetchAstroFirebaseID(firebaseId) {
  try {
    // Assuming you have a function to fetch customerFirebaseID from Firebase
    const astroFirebaseID = await get(ref(database, 'UserId/' + firebaseId));
    return astroFirebaseID?.val();
  } catch (error) {
    throw error;
  }
}

async function getChatData(chatId) {
  try {
    const messageRef = query(
      collection(firestore, `chats/${chatId}/messages`),
      orderBy("addedAt", "desc")
    );
    const snapshot = await getDocs(messageRef);
    const messages = snapshot.docs.map((doc) => doc.data());
    return messages;
  } catch (e) {
    console.log(e)
  }
}
function* deleteChatHistory(actions) {
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
        url: api_url + delete_chat_history,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Data Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_CHAT_HISTORY, payload: null });
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

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getChatSummary(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = actions;
    const customerFirebaseID = yield call(fetchCustomerFirebaseID, payload?.customerID);
    const astroFirebaseID = yield call(fetchAstroFirebaseID, payload?.astroID)
    const chatId = `${customerFirebaseID}+${astroFirebaseID}`
    const messages = yield call(getChatData, chatId)
    if (messages) {
      let chatData = messages.map(item => {
        const user = {
          id: item?.user?._id.toString().toLocaleLowerCase(),
          avatar: item?.user?.avatar
        }

        let media = null

        if (typeof item?.image != 'undefined') {
          media = {
            type: 'image',
            url: item?.image,
            size: '',
            name: ''
          }
        }

        if (typeof item?.file != 'undefined') {
          media = {
            type: 'file',
            url: item?.file?.url,
            size: '',
            name: item?.file?.fileType
          }
        }

        if (!!media) {
          return {
            ...item, createdAt: new Date(item?.createdAt), user, media
          }
        }
        return {
          ...item, createdAt: new Date(item?.createdAt), user,
        }

      })
      yield put({ type: actionTypes.SET_CUSTOMER_FIREBASE_ID, payload: customerFirebaseID.toLocaleLowerCase() })
      yield put({ type: actionTypes.SET_CHAT_SUMMARY, payload: chatData.reverse() })
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getCallHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_call_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CALL_HISTORY,
        payload: response?.data.reverse(),
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* deleteCallHistory(actions) {
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
        url: api_url + delete_call_history,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Data Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_CALL_HISTORY, payload: null });
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

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getRechargeHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_recharge_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_RECHARGE_HISTORY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getDemoClassHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_demo_class_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_DEMO_CLASS_HISTORY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateDemoClassStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_demo_class_history_status,
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
      yield put({ type: actionTypes.GET_DEMO_CLASS_HISTORY, payload: null });
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
    console.error("Error Updating Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteDemoClassHistory(actions) {
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
        url: api_url + delete_demo_class_history,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Data Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_DEMO_CLASS_HISTORY, payload: null });
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

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getLiveClassHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_live_class_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_LIVE_CLASS_HISTORY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateLiveClassStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_live_class_history_status,
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
      yield put({ type: actionTypes.GET_LIVE_CLASS_HISTORY, payload: null });
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
    console.error("Error Updating Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteLiveClassHistory(actions) {
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
        url: api_url + delete_live_class_history,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Data Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_LIVE_CLASS_HISTORY, payload: null });
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

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getLiveCourseHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_live_course_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_LIVE_COURSE_HISTORY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateLiveCourseHistoryStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_live_course_history_status,
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
      yield put({ type: actionTypes.GET_LIVE_COURSE_HISTORY, payload: null });
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
    console.error("Error Updating Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getRegisterLiveClassHistory(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + get_register_live_class_history,
      header: "json",
      data: payload,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_REGISTER_LIVE_CLASS_HISTORY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}


export default function* historySaga() {
  yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory);
  yield takeLeading(actionTypes.DELETE_CHAT_HISTORY, deleteChatHistory);
  yield takeLeading(actionTypes.GET_CHAT_SUMMARY, getChatSummary)
  yield takeLeading(actionTypes.GET_CALL_HISTORY, getCallHistory)
  yield takeLeading(actionTypes.DELETE_CALL_HISTORY, deleteCallHistory)
  yield takeLeading(actionTypes.GET_RECHARGE_HISTORY, getRechargeHistory)
  yield takeLeading(actionTypes.GET_DEMO_CLASS_HISTORY, getDemoClassHistory)
  yield takeLeading(actionTypes.UPDATE_DEMO_CLASS_HISTORY_STATUS, updateDemoClassStatus)
  yield takeLeading(actionTypes.DELETE_DEMO_CLASS_HISTORY, deleteDemoClassHistory)
  yield takeLeading(actionTypes.GET_LIVE_CLASS_HISTORY, getLiveClassHistory)
  yield takeLeading(actionTypes.UPDATE_LIVE_CLASS_HISTORY_STATUS, updateLiveClassStatus)
  yield takeLeading(actionTypes.DELETE_LIVE_CLASS_HISTORY, deleteLiveClassHistory)
  yield takeLeading(actionTypes.GET_LIVE_COURSE_HISTORY, getLiveCourseHistory)
  yield takeLeading(actionTypes.CHANGE_LIVE_COURSE_HISTORY_STATUS, updateLiveCourseHistoryStatus)
  yield takeLeading(actionTypes.GET_REGISTER_LIVE_CLASS_HISTORY, getRegisterLiveClassHistory)
}
