import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_astrologer,
  api_url,
  change_enquiry_status,
  delete_astrologer,
  get_all_astrologers,
  get_enquired_astrologer,
  update_astrologer,
  verify_astrologer,
  get_astrologer,
  update_astrologer_status,
  update_astrologer_call_status,
  update_astrologer_chat_status,
  get_all_active_astrologers,
  update_astrologer_skill,
  update_astrologer_remedies,
  update_astrologer_experties,
  update_astrologer_allowed_countries,
  update_astrologer_preferred_days,
  update_astrologer_profile_image,
  update_astrologer_bank_image,
  update_astrologer_id_image,
  update_astrologer_gallery_image,
  update_astrologer_astrologer_type
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function extractErrorMessage(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const pre = doc.querySelector("pre");
  return pre ? pre.textContent : "Failed to add Astrologer";
}

function* addAstrologer(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING , payload: false });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + add_astrologer,
      header: "form",
      data: payload?.data,
    });

    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      },

      // window.location.href = "#/astrologers/displayAstrologer"
    );


      yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null });
      yield call(payload.callback);
    } else {
      const errorMessage = extractErrorMessage(
        response?.Error?.message || "Failed to add Astrologer"
      );
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log("error", e);
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });

  }
}

function* getAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_all_astrologers,
    });

    if (response.success) {
      yield put({
        type: actionTypes.GET_ALL_ASTROLOGER,
        payload: response?.data,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* getActiveAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_all_active_astrologers,
    });

    if (response.success) {
      yield put({
        type: actionTypes.GET_ALL_ACTIVE_ASTROLOGER,
        payload: response?.data,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* getAstrologer(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { astrologerId } = action.payload;
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + `admin/astrologers/${astrologerId}`,
    });

    if (response.success) {
      yield put({
        type: actionTypes.GET_ASTROLOGER,
        payload: response?.data,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* getEnquiryAstrologers() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + get_enquired_astrologer,
    });

    if (response.success) {
      yield put({
        type: actionTypes.SET_ENQUIRY_ASTROLOGERS,
        payload: response?.enquiredAstrologer,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.UNSET_IS_LOADING , payload: false });
  }
}

function* updateAstrologerStatus(action) {
  try {
    const { payload } = action;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_status,
      header: "json",
      data: payload,
    });

    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({
        type: actionTypes.UPDATE_ASTROLOGER_STATUS,
        payload: response,
      });
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
    console.error("Error Updating Astrologer Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Astrologer Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* updateAstrologerCallStatus(action) {
  try {
    const { payload } = action;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_call_status,
      header: "json",
      data: payload,
    });

    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Call Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({
        type: actionTypes.UPDATE_ASTROLOER_CALL_STATUS,
        payload: response,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Call Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Error Updating Astrologer Call Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Astrologer Call Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* updateAstrologerChatStatus(action) {
  try {
    const { payload } = action;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_chat_status,
      header: "json",
      data: payload,
    });

    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Chat Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({
        type: actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS,
        payload: response,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Chat Status Updation Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Error Updating Astrologer Chat Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Astrologer Chat Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* updateEnquiryStatus(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + change_enquiry_status,
      header: "json",
      data: payload,
    });

    yield put({ type: actionTypes.GET_ENQUIRY_ASTROLOGERS });
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* updateAstrologerData(actions) {
  const { payload } = actions;
  try {
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer,
      header: "",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Astrologer Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: response });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Astrologer",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* verifyUnverifyAstrologer(actions) {
  try {
    const { payload } = actions;
    const result = yield Swal.fire({
      title: `Are you sure to ${
        payload?.isVerified === "false" ? "Unverify" : "Verify"
      } this Astrologer`,
      text: "This Astrologer will be verified for active in App",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: `${
        payload?.isVerified === "false" ? "Unverify" : "Verify"
      }`,
    });

    if (result?.isConfirmed) {
      // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield call(ApiRequest.postRequest, {
        url: api_url + verify_astrologer,
        header: "json",
        data: payload,
      });

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Astrologer Status Changed",
          showConfirmButton: false,
          timer: 2000,
        });
        yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Status Change failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* deleteAstrologer(actions) {
  try {
    const { payload } = actions;

    const result = yield Swal.fire({
      title: "Are you sure to delete this Astrologer",
      text: "This Astrologer will be removed from the App",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: "Delete",
    });

    if (result?.isConfirmed) {
      // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

      const response = yield call(ApiRequest.postRequest, {
        url: api_url + delete_astrologer,
        header: "json",
        data: payload,
      });

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Astrologer has been deleted.",
          icon: "success",
        });
        yield put({ type: actionTypes.GET_ALL_ASTROLOGER, payload: null });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Failed to Delete the Astrologer",
          icon: "error",
        });
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* updateAstrologerSkillData(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_skill,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Skill Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Skill",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerRemediesData(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_remedies,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Remedies Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Remedies",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerExpertiesData(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_experties,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Expertise Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Expertise",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerAlllowedCountriesData(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_allowed_countries,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Allowed Countries Data Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Data",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerPreferredDaysData(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_preferred_days,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Data Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Data",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerProfileImage(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_profile_image,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Image Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Image",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerBankImage(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_bank_image,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Image Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Image",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}
function* updateAstrologerGalleryImage(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_gallery_image,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Image Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Image",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

function* updateAstrologerAstrologerType(actions) {
  try {
    const { payload } = actions;
    // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield call(ApiRequest.postRequest, {
      url: api_url + update_astrologer_astrologer_type,
      header: "application/json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Data Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to update Data",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    // yield put({ type: actionTypes.SET_IS_LOADING , payload: false });
  }
}

export default function* astrologerSaga() {
  yield takeLeading(actionTypes.GET_ALL_ASTROLOGER, getAstrologers);
  yield takeLeading(
    actionTypes.GET_ALL_ACTIVE_ASTROLOGER,
    getActiveAstrologers
  );
  yield takeLeading(actionTypes.GET_ASTROLOGER, getAstrologer);
  yield takeLeading(actionTypes.GET_ENQUIRY_ASTROLOGERS, getEnquiryAstrologers);
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_CHAT_STATUS,
    updateAstrologerChatStatus
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOER_CALL_STATUS,
    updateAstrologerCallStatus
  );
  yield takeLeading(actionTypes.UPDATE_ENQUIRY_STATUS, updateEnquiryStatus);
  yield takeLeading(actionTypes.UPDATE_ASTROLOGER_DATA, updateAstrologerData);
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_STATUS,
    updateAstrologerStatus
  );
  yield takeLeading(actionTypes.ADD_ASTROLOGER, addAstrologer);
  yield takeLeading(
    actionTypes.VERIFY_UNVERIFY_ASTROLOGER,
    verifyUnverifyAstrologer
  );
  yield takeLeading(actionTypes.DELETE_ASTROLOGER, deleteAstrologer);
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_SKILL,
    updateAstrologerSkillData
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_REMEDIES,
    updateAstrologerRemediesData
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_EXPERTIES,
    updateAstrologerExpertiesData
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_ALLOWED_COUNTRIES,
    updateAstrologerAlllowedCountriesData
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_PREFERRED_DAYS,
    updateAstrologerPreferredDaysData
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_PROFILE_IMAGE,
    updateAstrologerProfileImage
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_BANK_PROOF_IMAGE,
    updateAstrologerBankImage
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_GALLERY_IMAGE,
    updateAstrologerGalleryImage
  );
  yield takeLeading(
    actionTypes.UPDATE_ASTROLOGER_ASTROLOGER_TYPE,
    updateAstrologerAstrologerType
  );
}
