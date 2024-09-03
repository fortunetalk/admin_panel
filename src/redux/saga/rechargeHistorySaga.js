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


export default function* rechargeHistorySaga() {
  yield takeLeading(actionTypes.RECHARGE_HISTORY_LIST, rechargeHistory);

}
