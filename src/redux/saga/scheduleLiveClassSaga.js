
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url,class_list, add_class, change_class_status, delete_class, update_class } from '../../utils/Constants';
import { Colors } from "../../assets/styles";
import { getScheduleClassData } from '../Actions/scheduleLiveClassActions';


function* scheduleClass(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_class,
      header: "application/json",
      data: payload,
    });


    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Class Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.SCHEDULE_CLASS_LIST, payload: response});
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
      text: e.message ,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: e });
  } finally{
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

  }
}

function* getAllScheduleClass(action) {
    try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const { liveClassId } = action.payload;
      const response = yield call(ApiRequest.getRequest, {
        url: `${api_url}${class_list}/${liveClassId}`,
      });
  
      if (response) {
        yield put({
          type: actionTypes.SCHEDULE_CLASS_LIST,
          payload: response.data,
        });
      }
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
      console.log(e);
    }
  }
  
function* updateScheduleClassStatus(action) {
    const { payload } = action;
  try {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + change_class_status,
          header: "json",
          data: payload,
      });
      console.log('response',response.data.liveClassId)
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Live Class Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.SCHEDULE_CLASS_LIST, payload: response.data.liveClassId });
        yield put(getScheduleClassData({
            classId: response.data.liveClassId
        }));
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
      console.error('Error Updating Live Class Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Live Class Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // yield put(getScheduleClassData(payload.liveClassId));

    }
}

function* updateScheduleClass(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    
    const response = yield ApiRequest.postRequest({
      url: api_url+update_class,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Class Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.SCHEDULE_CLASS_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Class Update Failed",
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
function* deleteScheduleClass(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete Live Class`,
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
        url: api_url + delete_class,
        header: "json",
        data: {
          classId: payload?.classId

        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Class Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.SCHEDULE_CLASS_LIST, payload: response.data.liveClassId })

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Class Delete Failed",
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
export default function* scheduleLiveClassSaga() {
  yield takeLeading(actionTypes.SCHEDULE_CLASS, scheduleClass);
  yield takeLeading(actionTypes.SCHEDULE_CLASS_LIST, getAllScheduleClass);
  yield takeLeading(actionTypes.UPDATE_SCHEDULE_CLASS, updateScheduleClass);
  yield takeLeading(actionTypes.UPDATE_SCHEDULE_CLASS_STATUS, updateScheduleClassStatus);
  yield takeLeading(actionTypes.DELETE_SCHEDULE_CLASS, deleteScheduleClass);
}
