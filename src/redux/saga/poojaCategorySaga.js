import { put, call, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  create_pooja_category,
  pooja_category_list,
  change_pooja_category_status,
  update_pooja_category,
  delete_pooja_category, 
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* setPoojaCategory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_pooja_category,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Pooja Category Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.POOJA_CATEGORY_LIST, payload: response });
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
    yield put({ type: actionTypes.SET_IS_LOADING, payload: e });
  }
}

function* getPoojaCategory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + pooja_category_list,
    });

    if (response) {
      yield put({
        type: actionTypes.POOJA_CATEGORY_LIST,
        payload: response?.data.reverse(),
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updatePoojaCategoryStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_pooja_category_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Pooja Category Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.POOJA_CATEGORY_LIST, payload: response });
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
    console.error("Error Updating Product Category Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Remedy Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}
function* updatePoojaCategory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_pooja_category,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Pooja Category Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.POOJA_CATEGORY_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Remedy Update Failed",
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
function* deletePoojaCategory(actions) {
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
    });

    if (result.isConfirmed) {
      yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_pooja_category,
        header: "json",
        data: {
          categoryId: payload?.categoryId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Pooja Category Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.POOJA_CATEGORY_LIST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Pooja Category Delete Failed",
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

export default function* poojaCategorySaga() {
  yield takeLeading(actionTypes.CREATE_POOJA_CATEGORY, setPoojaCategory);
  yield takeLeading(actionTypes.POOJA_CATEGORY_LIST, getPoojaCategory);
  yield takeLeading(actionTypes.UPDATE_POOJA_CATEGORY, updatePoojaCategory);
  yield takeLeading(
    actionTypes.UPDATE_POOJA_CATEGORY_STATUS,
    updatePoojaCategoryStatus
  );
  yield takeLeading(actionTypes.DELETE_POOJA_CATEGORY, deletePoojaCategory);
}
