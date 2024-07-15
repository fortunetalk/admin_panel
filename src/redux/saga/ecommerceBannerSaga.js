
import { put, call, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { ApiRequest } from '../../utils/apiRequest';
import Swal from "sweetalert2";
import { api_url, create_ecommerce_banner, ecommerce_banner_list,update_ecommerce_banner, change_ecommerce_banner_status, delete_ecommerce_banner} from '../../utils/Constants';
import { Colors } from "../../assets/styles";


function* addEcommerceBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_ecommerce_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Ecommerce Banner Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ECOMMERCE_BANNER, payload: response});
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

function* getAllEcommerceBanner() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + ecommerce_banner_list,
    });


    if (response) {
      yield put({
        type: actionTypes.GET_ALL_ECOMMERCE_BANNER,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateEcommerceBannerStatus(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + change_ecommerce_banner_status,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Ecommerce Banner Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_ECOMMERCE_BANNER, payload: response });
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
function* updateEcommerceBanner(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    
    const response = yield ApiRequest.postRequest({
      url: api_url+update_ecommerce_banner,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Ecommerce Banner Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ECOMMERCE_BANNER, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Ecommerce Banner Update Failed",
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
function* deleteEcommerceBanner(actions) {
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
        url: api_url + delete_ecommerce_banner,
        header: "json",
        data: {
          bannerId: payload?.bannerId

        },
      });
  
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Ecommerce Banner Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({type: actionTypes.GET_ALL_ECOMMERCE_BANNER, payload: null})

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Ecommerce Banner Deletion Failed",
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
export default function* ecommerceBannerSaga() {
  yield takeLeading(actionTypes.CREATE_ECOMMERCE_BANNER, addEcommerceBanner);
  yield takeLeading(actionTypes.GET_ALL_ECOMMERCE_BANNER, getAllEcommerceBanner);
  yield takeLeading(actionTypes.UPDATE_ECOMMERCE_BANNER, updateEcommerceBanner);
  yield takeLeading(actionTypes.UPDATE_ECOMMERCE_BANNER_STATUS, updateEcommerceBannerStatus);
  yield takeLeading(actionTypes.DELETE_ECOMMERCE_BANNER, deleteEcommerceBanner);
}
