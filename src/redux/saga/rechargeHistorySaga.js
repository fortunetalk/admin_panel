import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  recharge_history_add,
  recharge_history_delete,
  recharge_history_list,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";


function* addRechargeHistory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + recharge_history_add,
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
      yield put({ type: actionTypes.RECHARGE_HISTORY_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: response?.message,
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

function* rechargeHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    
    const response = yield ApiRequest.getRequest({
      url: api_url + recharge_history_list,
    });

    if (response?.success) {
      // Filter the data to only include entries with type 'WALLET_RECHARGE'
      const filteredData = response.data.filter(item => item.type === 'WALLET_RECHARGE');

      yield put({
        type: actionTypes.RECHARGE_HISTORY_LIST,
        payload: filteredData,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteRechargeHistory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const result = yield Swal.fire({
      title: `Are you sure to delete this plan.`,
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
        url: api_url + recharge_history_delete,
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

        yield put({ type: actionTypes.RECHARGE_HISTORY_LIST, payload: null });
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




export default function* rechargeHistorySaga() {
  yield takeLeading(actionTypes.RECHARGE_HISTORY_ADD, addRechargeHistory);
  yield takeLeading(actionTypes.RECHARGE_HISTORY_LIST, rechargeHistory);
  yield takeLeading(actionTypes.RECHARGE_HISTORY_DELETE, deleteRechargeHistory);

}
