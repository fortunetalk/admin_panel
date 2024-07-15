import { put, call, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import Swal from "sweetalert2";
import {
  api_url,
  create_product_category,
  product_category_list,
  change_product_category_status,
  delete_product_category,
  update_product_category,
} from "../../utils/Constants";
import { Colors } from "../../assets/styles";

function* addProductCategory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + create_product_category, 
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Product Category Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.PRODUCT_CATEGORY_LIST, payload: response });
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

function* getProductCategory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + product_category_list,
    });

    if (response) {
      yield put({
        type: actionTypes.PRODUCT_CATEGORY_LIST,
        payload: response?.data,
      });
    }
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateProductCategoryStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_product_category_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Product Category Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.PRODUCT_CATEGORY_LIST, payload: response });
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
function* updateProductCategory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_product_category,
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
      yield put({ type: actionTypes.PRODUCT_CATEGORY_LIST, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Pooja Category Update Failed",
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
function* deleteProductCategory(actions) {
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
        url: api_url + delete_product_category,
        header: "json",
        data: {
          categoryId: payload?.categoryId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Remedy Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.PRODUCT_CATEGORY_LIST, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Remedy Delete Failed",
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
export default function* productCategorySaga() {
  yield takeLeading(actionTypes.CREATE_PRODUCT_CATEGORY, addProductCategory);
  yield takeLeading(actionTypes.PRODUCT_CATEGORY_LIST, getProductCategory);
  yield takeLeading(actionTypes.UPDATE_PRODUCT_CATEGORY, updateProductCategory);
  yield takeLeading(
    actionTypes.UPDATE_PRODUCT_CATEGORY_STATUS,
    updateProductCategoryStatus
  );
  yield takeLeading(actionTypes.DELETE_PRODUCT_CATEGORY, deleteProductCategory);
}
