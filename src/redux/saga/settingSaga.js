import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  api_url,
  get_country,
  change_country_status,
  delete_country,
  update_country,
  add_new_country,
  get_state,
  change_state_status,
  delete_state,
  update_state,
  add_new_state,
  get_city,
  change_city_status,
  delete_city,
  update_city,
  add_new_city,
  country_state_list,
  state_city_list,
  get_country_value
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* createCountry(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_new_country,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Country Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_COUNTRY, payload: response.data });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

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
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Country Already Existed",
      text: e.message || "Country Already Existed",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* getCountries() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_country,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_COUNTRY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getCountryValue() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_country_value,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_COUNTRY_VALUE,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateCountry(actions) {
  try {
    const { formData, countryId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_country + `${countryId}`,
      header: "json",
      data: formData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Country Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_COUNTRY, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Country Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateCountryStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_country_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Country Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UPDATE_COUNTRY_STATUS, payload: response });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
  } catch (error) {
    console.error("Error Updating Country Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Sub Skill Status",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* deleteCountry(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

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

      const response = yield ApiRequest.postRequest({
        url: api_url + delete_country,
        header: "json",
        data: {
          countryId: payload?.countryId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Country Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_COUNTRY, payload: null });
        yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Country Deletion Failed",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

      }
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getCountryStateList(actions) {
  try {
    const { countryId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + country_state_list,
      header: "application/json",
      data: { countryId },
    });
    if (response?.success) {
      yield put({ type: actionTypes.COUNTRY_STATE_LIST, payload: response?.data });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    }
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* getStateCityList(actions) {
  try {
    const { stateId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + state_city_list,
      header: "application/json",
      data: { stateId },
    });
    if (response?.success) {
      yield put({ type: actionTypes.STATE_CITY_LIST, payload: response?.data });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    }
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* createState(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_new_state,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "State Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
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
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error",
      text: e.message || "An unexpected error occurred",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* getStates() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_state,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_STATE,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateState(actions) {
  try {
    const { formData, stateId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_state + `${stateId}`,
      header: "application/json",
      data: formData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "State Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({ type: actionTypes.GET_ALL_STATE, payload: null });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "State Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* updateStateStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_state_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

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
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}

function* deleteState(actions) {
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
        url: api_url + delete_state,
        header: "json",
        data: {
          stateId: payload?.stateId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "State Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_STATE, payload: null });
        yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "State Deletion Failed",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

      }
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* createCity(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_new_city,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "City Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

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
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Unexpected Error",
      text: e.message || "An unexpected error occurred",
      showConfirmButton: false,
      timer: 2000,
    });
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  }
}

function* getCities() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_city,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_CITY,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* updateCityStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_city_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UPDATE_CITY_STATUS, payload: response });
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

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
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  }
}
function* updateCity(actions) {
  try {
    const { formData, cityId } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_city + `${cityId}`,
      header: "application/json",
      data: formData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "City Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_CITY, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "City Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}
function* deleteCity(actions) {
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
        url: api_url + delete_city,
        header: "json",
        data: {
          cityId: payload?.cityId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "City Deleted Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_CITY, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "City Deletion Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });

    }
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.UNSET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* settingSaga() {
  yield takeLeading(actionTypes.CREATE_COUNTRY, createCountry);
  yield takeLeading(actionTypes.GET_ALL_COUNTRY, getCountries);
  yield takeLeading(actionTypes.GET_COUNTRY_VALUE, getCountryValue);
  yield takeLeading(actionTypes.COUNTRY_STATE_LIST, getCountryStateList);
  yield takeLeading(actionTypes.STATE_CITY_LIST, getStateCityList);
  yield takeLeading(actionTypes.UPDATE_COUNTRY_STATUS, updateCountryStatus);
  yield takeLeading(actionTypes.UPDATE_COUNTRY, updateCountry);
  yield takeLeading(actionTypes.DELETE_COUNTRY, deleteCountry);

  yield takeLeading(actionTypes.CREATE_STATE, createState);
  yield takeLeading(actionTypes.GET_ALL_STATE, getStates);
  yield takeLeading(actionTypes.UPDATE_STATE_STATUS, updateStateStatus);
  yield takeLeading(actionTypes.UPDATE_STATE, updateState);
  yield takeLeading(actionTypes.DELETE_STATE, deleteState);

  yield takeLeading(actionTypes.CREATE_CITY, createCity);
  yield takeLeading(actionTypes.GET_ALL_CITY, getCities);
  yield takeLeading(actionTypes.UPDATE_CITY_STATUS, updateCityStatus);
  yield takeLeading(actionTypes.UPDATE_CITY, updateCity);
  yield takeLeading(actionTypes.DELETE_CITY, deleteCity);
}
