import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_expertise,
  add_main_expertise,
  api_url,
  delete_expertise,
  delete_main_expertise,
  get_expertise,
  get_active_expertise,
  get_main_expertise,
  update_expertise,
  update_main_expertise,
  change_expertise_status
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* createExperties(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_expertise,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Experties Added Successfull",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({type: actionTypes.GET_ALL_EXPERTIES, payload: response})
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Experties Submission Failed",
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


function* updateExperties(actions) {
  try {
    const { data, expertiseId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_expertise + `${expertiseId}`,
      header: "json",
      data: data,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Experties Updated Successfull",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({type: actionTypes.GET_ALL_EXPERTIES, payload: null})
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Experties Update Failed",
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

function* deleteExperties(actions) {
  try {
    const { expertiseId, title } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to Delete ${title}`,
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
        url: api_url + delete_expertise,
        header: "json",
        data: {
          expertiseId: expertiseId
        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Experties Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_EXPERTIES, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Experties Delete Failed",
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

function* getExperties() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_expertise,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_EXPERTIES,
        payload: response?.data.reverse(),
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}
function* getActiveExperties() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_active_expertise,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_ACTIVE_EXPERTIES,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

function* updateExpertiseStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + change_expertise_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Expertise Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_EXPERTIES, payload: response });
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
      console.error('Error Updating Expertise Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Expertise Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    }
}

export default function* expertiesSaga() {
  yield takeLeading(actionTypes.GET_ALL_EXPERTIES, getExperties);
  yield takeLeading(actionTypes.GET_ALL_ACTIVE_EXPERTIES, getActiveExperties);
  yield takeLeading(actionTypes.CREATE_EXPERTIES, createExperties)
  yield takeLeading(actionTypes.UPDATE_EXPERTIES, updateExperties)
  yield takeLeading(actionTypes.DELETE_EXPERTIES, deleteExperties)
  yield takeLeading(actionTypes.UPDATE_EXPERTISE_STATUS, updateExpertiseStatus)

}
