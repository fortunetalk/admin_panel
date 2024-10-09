import { call, put, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  create_international_price,
  delete_international_price,
  get_international_price,
  update_international_price,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";




function* createInternationalPrice(actions) {

  try {
    const { body, onAdd } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_international_price,
      header: "json",
      data: body,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "International Price Added",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(onAdd);
      yield put({ type: actionTypes.GET_INTERNATIONAL_PRICE, payload: null });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: " Failed to add International Price ",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }

}


function* getInternationalPrice() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_international_price,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_INTERNATIONAL_PRICE,
        payload: response?.data.reverse(),
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateInternationalPrice(actions) {
  try {
    const { body, onAdd } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_international_price,
      header: "json",
      data: body,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "International Price Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield call(onAdd);
      yield put({ type: actionTypes.GET_INTERNATIONAL_PRICE, payload: null });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "International Price Updated Failed",
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

function* deleteInternationalPrice(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to delete this International Price.`,
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
        url: api_url + delete_international_price,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: response?.message,
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_INTERNATIONAL_PRICE, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: response?.message,
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


export default function* internationalPricingSaga() {
  yield takeLeading(actionTypes.CREATE_INTERNATIONAL_PRICE, createInternationalPrice);
  yield takeLeading(actionTypes.GET_INTERNATIONAL_PRICE, getInternationalPrice);
  yield takeLeading(actionTypes.UPDATE_INTERNATIONAL_PRICE, updateInternationalPrice);
  yield takeLeading(actionTypes.DELETE_INTERNATIONAL_PRICE, deleteInternationalPrice);
}
