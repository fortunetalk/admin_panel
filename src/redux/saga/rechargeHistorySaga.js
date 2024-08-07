import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  recharge_history_list,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* rechargeHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + recharge_history_list,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.RECHARGE_HISTORY_LIST,
        payload: response.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    console.log(e);
  }
}

export default function* rechargeHistorySaga() {
  yield takeLeading(actionTypes.RECHARGE_HISTORY_LIST, rechargeHistory);

}
