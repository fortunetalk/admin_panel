import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import { api_url, add_customer,change_customer_status, delete_customer, get_all_customers, update_customer, recharge_by_admin, admin_recharge_history, update_chat_call_count } from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";


function* addCustomer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_customer,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Customer Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: response.data });
    } else if (response.error) {
      // Check if the error is a validation error and display appropriate message
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
      title: "Error",
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: e });
  }
  finally{
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getCustomers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_all_customers
    })

    if (response?.success) {
      yield put({ type: actionTypes.SET_ALL_CUSTOMER, payload: response?.data.reverse()})
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* deleteCustomers(actions) {
  try {
    const { payload } = actions

    const result = yield Swal.fire({
      title: `Are you sure to Delete ${payload?.customerName}`,
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
        url: api_url + delete_customer,
        header: 'json',
        data: {
          customerId: payload?.customerId
        }
      })

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Customer has been deleted!",
          icon: "success",
        });
        yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: null })
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the Customer",
          icon: "error",
        });
      }
    }



    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateCustomerStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_customer_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Cusomter Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: response });
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
    console.error("Error Updating Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateCustomer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_customer,
      header: "application/json",
      data: payload,
    });

    // Check if the response was successful
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Customer Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: response.data });
    } else {
      Swal.fire({
        icon: "error",
        title: "Warning",
        text: response?.message || "Failed to edit customer",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "An error occurred while updating the customer",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* addRecharge(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + recharge_by_admin,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Recharge Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: response.data });
    } else if (response.error) {
      // Check if the error is a validation error and display appropriate message
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
      title: "Error",
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: e });
  }
  finally{
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* rechargeHistory(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + admin_recharge_history,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      yield put({
        type: actionTypes.CUSTOMER_RECHARGE_HISTORY_LIST,
        payload: response.data,
      });
    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      yield put({ type: actionTypes.SET_IS_LOADING, payload: errorMessage });
    }
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: e.message });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}


function* updateChatCallCount(actions) {
  try {
    const { formPayload, onComplete } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_chat_call_count,
      header: "application/json",
      data: formPayload,
    });

    // Check if the response was successful
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Chat/Call Count Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CUSTOMER, payload: response.data });
      yield call(onComplete);
    } else {
      Swal.fire({
        icon: "error",
        title: "Warning",
        text: response?.message || "Failed to update chat/call count",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "An error occurred while updating the customer",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* customerSaga() {
  yield takeLeading(actionTypes.ADD_CUSTOMER, addCustomer)
  yield takeLeading(actionTypes.GET_ALL_CUSTOMER, getCustomers)
  yield takeLeading(actionTypes.DELETE_CUSTOMER, deleteCustomers)
  yield takeLeading(actionTypes.BAN_CUSTOMER, updateCustomerStatus)
  yield takeLeading(actionTypes.UPDATE_CUSTOMER, updateCustomer)
  yield takeLeading(actionTypes.ADD_RECHARGE_BY_ADMIN, addRecharge)
  yield takeLeading(actionTypes.CUSTOMER_RECHARGE_HISTORY_LIST, rechargeHistory)
  yield takeLeading(actionTypes.UPDATE_CHAT_CALL_COUNT, updateChatCallCount)
}
