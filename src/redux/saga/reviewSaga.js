import { call, put, race, takeEvery } from "redux-saga/effects";
import {
  api_url,
  delete_review,
  get_review,
  update_review,
  verify_review,
} from "../../utils/Constants";
import { ApiRequest } from "../../utils/apiRequest";
import * as actionTypes from "../actionTypes";
import Swal from "sweetalert2";

function* getAstrologersReviews() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    console.log(api_url + get_review);
    const response = yield ApiRequest.getRequest({
      url: api_url + get_review,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_ASTROLOGERS_REVIEWS,
        payload: response.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getAppReviews() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + "",
      header: "json",
      data: {},
    });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* verifyAstrologerReview(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + verify_review,
      header: "json",
      data: {
        review_id: payload?.id,
        is_verified: payload?.isVerify,
      },
    });

    yield put({ type: actionTypes.GET_ASTROLOGERS_REVIEWS });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteAstrologerReview(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + delete_review,
      header: "json",
      data: {
        reviewId: payload,
      },
    });

    if (response?.success) {
      Swal.fire({
        title: "Deleted!",
        text: "Review has been deleted!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "Failed to Delete the Review",
        icon: "error",
      });
    }

    yield put({ type: actionTypes.GET_ASTROLOGERS_REVIEWS });

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateAstrologerReview(actions) {
  try {
    const { body, onComplete } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_review,
      header: "json",
      data: body,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Review Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ASTROLOGERS_REVIEWS, payload: null });
      yield call(onComplete);
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Review Update Failed",
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

export default function* reviewSaga() {
  yield takeEvery(actionTypes.GET_ASTROLOGERS_REVIEWS, getAstrologersReviews);
  yield takeEvery(actionTypes.SET_APP_REVIEWS, getAppReviews);
  yield takeEvery(
    actionTypes.UPDATE_ASTROLOER_REVIEW_STATUS,
    verifyAstrologerReview
  );
  yield takeEvery(actionTypes.DELETE_ASTROLOGER_REVIEW, deleteAstrologerReview);
  yield takeEvery(actionTypes.UPDATE_ASTROLOER_REVIEW, updateAstrologerReview);
}
