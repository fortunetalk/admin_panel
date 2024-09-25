
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url, create_astrologer_training_banner, astrologer_training_banner_list,update_astrologer_training_banner, change_astrologer_training_banner_status, delete_astrologer_training_banner} from '../../utils/Constants';
import { Colors } from "../../assets/styles";


function* addAstrologerTrainingBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_astrologer_training_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Astrolgoer Training Banner Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER, payload: null});
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    }

  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error Occured",
      text: e.message ,
      showConfirmButton: false,
      timer: 2000,
    });
  }finally{
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getAllAstrologerTrainingBanner() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + astrologer_training_banner_list,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER,
        payload: response?.data.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateAstrologerTrainingBannerStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + change_astrologer_training_banner_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Training Banner Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER, payload: null });
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
      console.error('Error Updating Course Banner Status:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Change Course Banner Status",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* updateAstrologerTrainingBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    
    const response = yield ApiRequest.postRequest({
      url: api_url+update_astrologer_training_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Training Banner Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Course Banner Update Failed",
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
function* deleteAstrologerTrainingBanner(actions) {
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
        url: api_url + delete_astrologer_training_banner,
        header: "json",
        data: {
          bannerId: payload?.bannerId

        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Training Banner Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Astrologer Training Banner Deletion Failed",
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
export default function* astrologerTrainingBannerSaga() {
  yield takeLeading(actionTypes.CREATE_ASTROLOGER_TRAINING_BANNER, addAstrologerTrainingBanner);
  yield takeLeading(actionTypes.GET_ALL_ASTROLOGER_TRAINING_BANNER, getAllAstrologerTrainingBanner);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_TRAINING_BANNER, updateAstrologerTrainingBanner);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_TRAINING_BANNER_STATUS, updateAstrologerTrainingBannerStatus);
  yield takeLeading(actionTypes.DELETE_ASTROLOGER_TRAINING_BANNER, deleteAstrologerTrainingBanner);
}
