import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import {
  add_offers,
  api_url,
  delete_offers,
  get_offers,
  update_offers,
} from "../../utils/Constants";
import { Colors } from "../../assets/styles";
import { ApiRequest } from "../../utils/apiRequest";
import * as actionTypes from "../actionTypes";
import Swal from "sweetalert2";


function* addAstrologesOffers(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_offers,
      header: "json",
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Offer Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ASTROLOGERS_OFFERS, payload: response });
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
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* getAstrologersOffers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log(api_url + get_offers);
    const response = yield ApiRequest.getRequest({
      url: api_url + get_offers,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGERS_OFFERS,
        payload: response.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteAstrologerOffer(actions) {
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
        url: api_url + delete_offers,
        header: "json",
        data: {
          offerId: payload?.offerId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Offer Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ASTROLOGERS_OFFERS, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Offer Deletion Failed",
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

function* updateAstrologerOffer(action) {
  try {
      const { payload } = action;
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
      const response = yield ApiRequest.postRequest({
          url: api_url + update_offers,
          header: "json",
          data: payload,
      });
      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Offers Status Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ASTROLOGERS_OFFERS, payload: response });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Offers Updation Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    } catch (error) {
      console.error('Error Updating Offers :', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to Updating Offers",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
    }
}


export default function* offerSaga() {
  yield takeLeading(actionTypes.GET_ASTROLOGERS_OFFERS, getAstrologersOffers);
  yield takeLeading(actionTypes.DELETE_ASTROLOGER_OFFER, deleteAstrologerOffer);
  yield takeLeading(actionTypes.Add_ASTROLOGERS_OFFERS, addAstrologesOffers);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_OFFER, updateAstrologerOffer);

}
