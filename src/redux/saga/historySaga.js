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
  delete_call_history,
  get_chat_message_details,
  download_chat_history,
  download_call_history,
  update_admin_chat_review,
  update_admin_call_review

} from "../../utils/Constants";
import { database, firestore } from "../../config/firbase";
import { get, onValue, ref } from "firebase/database";
import { Colors } from "../../assets/styles";
import { doc, getDoc, collection, orderBy, query, onSnapshot, getDocs } from "firebase/firestore";
import { format } from 'date-fns';


function* getChatHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
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
    const { customerId, chatId, classes } = actions.payload;
    console.log(customerId)
    const response = yield ApiRequest.postRequest({
      url: api_url + get_chat_message_details,
      header: "json",
      data: {
        chatId
      },
    });

    console.log("response", response)

    if (response.success) {
      console.log(response.data)
      let chatData = response?.data.map(msg => {
        const timestamp = msg.createdAt;
        let formattedDate = '';

        if (timestamp) {
          let dateObj = typeof timestamp === 'number' ? new Date(timestamp) : new Date(Date.parse(timestamp));
          formattedDate = format(dateObj, 'eeee MMM d, yyyy h:mm a'); // Format as "DayOfWeek Month Date, Year h:mm AM/PM"
        }
        return {
          position: msg.user._id === customerId ? classes.right : classes.left,
          text: msg.image ? '' : msg?.text,
          date: formattedDate,
          type: msg.image ? 'photo' : (msg.video ? 'video' : (msg.audio ? 'audio' : 'text')),
          data: {
            uri: msg.image || msg.video || msg.audio,
            position: msg.user._id === customerId ? classes.right : classes.left
          }
        };

      })
      // yield put({ type: actionTypes.SET_CUSTOMER_FIREBASE_ID, payload: customerFirebaseID.toLocaleLowerCase() })
      yield put({ type: actionTypes.SET_CHAT_SUMMARY, payload: chatData })
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
        payload: response?.data.reverse(),
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
function* getDownloadChatHistory(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + download_chat_history,
      header: "json",
      data: payload,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_DOWNLOAD_CHAT_HISTORY,
        payload: response?.data?.data || [],
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getDownloadCallHistory(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + download_call_history,
      header: "json",
      data: payload,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_DOWNLOAD_CALL_HISTORY,
        payload: response?.data?.data || [],
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateAdminChatReview(actions) {
  const {reviewData , onRefreshTable } = actions.payload;
  try {
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_admin_chat_review,
      header: "json",
      data: reviewData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Review Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      // yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: response });
      yield call(onRefreshTable);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Reviews",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAdminCallReview(actions) {
  const {reviewData} = actions.payload;
  try {
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_admin_call_review,
      header: "json",
      data: reviewData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Review Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      // yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: response });
      // yield call(onRefreshTable);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Reviews",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
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
  yield takeLeading(actionTypes.GET_DOWNLOAD_CHAT_HISTORY, getDownloadChatHistory)
  yield takeLeading(actionTypes.GET_DOWNLOAD_CALL_HISTORY, getDownloadCallHistory)
  yield takeLeading(actionTypes.UPDATE_ADMIN_CHAT_REVIEW, updateAdminChatReview)
  yield takeLeading(actionTypes.UPDATE_ADMIN_CALL_REVIEW, updateAdminCallReview)
}
