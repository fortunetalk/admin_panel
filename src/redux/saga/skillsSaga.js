import { call, put, race, takeEvery, takeLeading } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { ApiRequest } from "../../utils/apiRequest";
import {
  add_skill,
  add_subSkill,
  api_url,
  delete_skill,
  delete_subSkill,
  get_active_skills,
  get_skills,
  get_subSkill,
  update_skill,
  update_subSkill,
  change_skill_status,
  change_subSkill_status,
} from "../../utils/Constants";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles";

function* createSkill(actions) {
  try {
    const { payload } = actions;
    console.log(payload);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_skill,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: payload,
    });
    if (response?.success) {
      Swal.fire({
        icon: "success",
        title: "Skill Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_SKILLS, payload: response });
    } else if (response.error) {
      const errorMessage = response.error.message || "Server Error";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
  } catch (e) {
    console.log(e);
    Swal.fire({
      icon: "error",
      title: "Unexpected Error Occurred",
      text: e.message,
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getSkills() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_skills,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_SKILLS,
        payload: response?.data,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    console.log(e);
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getActiveSkills() {
  try {
    const response = yield ApiRequest.getRequest({
      url: api_url + get_active_skills,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.GET_ALL_ACTIVE_SKILLS,
        payload: response?.data,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* updateSkill(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + update_skill,
      header: "form",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Skill Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      yield put({ type: actionTypes.GET_ALL_SKILLS, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Skill Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteSkill(actions) {
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
        url: api_url + delete_skill,
        header: "json",
        data: {
          skillId: payload?.skill_id,
        },
      });

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Skill Deleted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_SKILLS, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Skill Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateSkillStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_skill_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Skill Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.UPDATE_SKILL_STATUS, payload: response });
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
    console.error("Error Updating Skill Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Skill Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* createSubSkill(actions) {
  try {
    const { payload } = actions;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + add_subSkill,
      header: "json",
      data: payload,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Sub Skill Added Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Sub Skill Submission Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* getSubSkills() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_subSkill,
    });
    if (response?.success) {
      yield put({
        type: actionTypes.SET_ALL_SUB_SKILLS,
        payload: response?.data,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateSubSkill(actions) {
  try {
    const { formData, subSkill_id } = actions.payload;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const response = yield ApiRequest.postRequest({
      url: api_url + update_subSkill + `/${subSkill_id}`,
      header: "json",
      data: formData,
    });

    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Sub Skill Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_SUB_SKILLS, payload: null });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Sub Skill Update Failed",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteSubSkill(actions) {
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
        url: api_url + delete_subSkill,
        header: "json",
        data: {
          subskillId: payload?.subskillId,
        },
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Sub Skill Deleted Successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        yield put({ type: actionTypes.GET_ALL_SUB_SKILLS, payload: null });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Sub Skill Delete Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* updateSubSkillStatus(action) {
  try {
    const { payload } = action;
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.postRequest({
      url: api_url + change_subSkill_status,
      header: "json",
      data: payload,
    });
    if (response && response.success) {
      Swal.fire({
        icon: "success",
        title: "Sub Skill Status Updated Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      yield put({ type: actionTypes.GET_ALL_SUB_SKILLS, payload: response });
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
    console.error("Error Updating Sub Skill Status:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to Change Sub Skill Status",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

export default function* skillsSaga() {
  yield takeLeading(actionTypes.GET_ALL_SKILLS, getSkills);
  yield takeLeading(actionTypes.GET_ALL_ACTIVE_SKILLS, getActiveSkills);
  yield takeLeading(actionTypes.CREATE_SKILL, createSkill);
  yield takeLeading(actionTypes.UPDATE_SKILL, updateSkill);
  yield takeLeading(actionTypes.DELETE_SKILL, deleteSkill);
  yield takeLeading(actionTypes.UPDATE_SKILL_STATUS, updateSkillStatus);

  yield takeLeading(actionTypes.GET_ALL_SUB_SKILLS, getSubSkills);
  yield takeLeading(actionTypes.CREATE_SUB_SKILL, createSubSkill);
  yield takeLeading(actionTypes.UPDATE_SUB_SKILL, updateSubSkill);
  yield takeLeading(actionTypes.DELETE_SUB_SKILL, deleteSubSkill);
  yield takeLeading(actionTypes.UPDATE_SUB_SKILL_STATUS, updateSubSkillStatus);
}
