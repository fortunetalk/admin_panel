import * as actionTypes from "../actionTypes";

const initialState = {
  skillsData: [],
  activeSkillsData: null,
  subSkillData: null,
  isLoading: false,
};

const skills = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case actionTypes.SET_ALL_SKILLS: {
      return {
        ...state,
        skillsData: payload,
      };
    }

    case actionTypes.SET_ALL_SUB_SKILLS: {
      return {
        ...state,
        subSkillData: payload,
      };
    }

    case actionTypes.GET_ALL_SKILLS: {
      return {
        ...state,
        skillsData: payload,
      };
    }

    case actionTypes.GET_ALL_ACTIVE_SKILLS: {
      return {
        ...state,
        activeSkillsData: payload,
      };
    }

    case actionTypes.CREATE_SKILL: {
      const { title, image, status } = payload;
      const newSkill = { title, image, status };

      return {
        ...state,
        skillsData: state.skillsData
          ? [...state.skillsData, newSkill]
          : [newSkill],
      };
    }

    case actionTypes.UPDATE_SKILL_STATUS: {
      const { skillId, status } = payload;
      const updatedSkills = state.skillsData?.map((skill) =>
        skill._id === skillId ? { ...skill, status } : skill
      );
      return {
        ...state,
        skillsData: updatedSkills,
      };
    }

    case actionTypes.UPDATE_SKILL: {
      const { skillId, title, image, status } = payload;
      const updatedSkills = state.skillsData?.map((skill) =>
        skill._id === skillId ? { ...skill, title, image, status } : skill
      );
      return {
        ...state,
        skillsData: updatedSkills,
      };
    }

    case actionTypes.DELETE_SKILL: {
      const { skillId } = payload;
      const updatedSkills = state.skillsData?.filter(
        (skill) => skill._id !== skillId
      );
      return {
        ...state,
        skillsData: updatedSkills,
      };
    }

    case actionTypes.CREATE_SUB_SKILL: {
      const { formData } = payload;
      const newSubSkill = { ...formData };

      return {
        ...state,
        subSkillData: state.subSkillData
          ? [...state.subSkillData, newSubSkill]
          : [newSubSkill],
      };
    }

    case actionTypes.GET_ALL_SUB_SKILLS: {
      return {
        ...state,
        subSkillData: payload,
      };
    }

    case actionTypes.UPDATE_SUB_SKILL_STATUS: {
      const { subskillId, status } = payload;
      const updatedSubSkills = state.subSkillData?.map((data) =>
        data._id === subskillId ? { ...data, status } : data
      );
      return {
        ...state,
        subSkillData: updatedSubSkills,
      };
    }

    case actionTypes.UPDATE_SUB_SKILL: {
      const { formData, subSkill_id } = payload;
      const updatedSubSkills = state.subSkillData?.map((subSkill) =>
        subSkill._id === subSkill_id ? { ...subSkill, ...formData } : subSkill
      );
      return {
        ...state,
        subSkillData: updatedSubSkills,
      };
    }

    case actionTypes.DELETE_SUB_SKILL: {
      const { subskillId } = payload;
      const updatedSubSkills = state.subSkillData?.filter(
        (subSkill) => subSkill._id !== subskillId
      );
      return {
        ...state,
        subSkillData: updatedSubSkills,
      };
    }

    default: {
      return state;
    }
  }
};

export default skills;
