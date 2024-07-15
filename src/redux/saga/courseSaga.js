
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url,course_list,active_course_list, create_course, change_course_status, delete_course, update_course } from '../../utils/Constants';
import { Colors } from "../../assets/styles";


function* addCourse(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_course,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Course Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_COURSES, payload: response});
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
  }
}

function* getAllCourse() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + course_list,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_COURSES,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getActiveCourse() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + active_course_list,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ACTIVE_COURSES,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateCourseStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + change_course_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Course Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_COURSES, payload: response });
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
      console.error('Error Updating Course Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Course Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* updateCourse(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    
    const response = yield ApiRequest.postRequest({
      url: api_url+update_course,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Course Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_COURSES, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Course Update Failed",
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
function* deleteCourse(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.title}`,
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
        url: api_url + delete_course,
        header: "json",
        data: {
          courseId: payload?.courseId

        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Course Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_COURSES, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Course Delete Failed",
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
export default function* courseSaga() {
  yield takeLeading(actionTypes.CREATE_COURSE, addCourse);
  yield takeLeading(actionTypes.GET_ALL_COURSES, getAllCourse);
  yield takeLeading(actionTypes.GET_ACTIVE_COURSES, getActiveCourse);
  yield takeLeading(actionTypes.UPDATE_COURSE, updateCourse);
  yield takeLeading(actionTypes.UPDATE_COURSE_STATUS, updateCourseStatus);
  yield takeLeading(actionTypes.DELETE_COURSE, deleteCourse);
}
