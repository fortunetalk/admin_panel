import * as actionTypes from "../actionTypes";

const initialState = {
  skillsData: null, 
  activeSkillsData: null,
  subSkillData: null
};

const skills = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
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
        skillsData: state.skillsData ? [...state.skillsData, newSkill] : [newSkill],
      };
  }

    case actionTypes.UPDATE_SKILL_STATUS: {
      const { skillId, status } = payload;
      const updatedSkills = state.skillsData?.map(skill =>
          skill._id === skillId ? { ...skill, status } : skill
      );
      return {
          ...state,
          skillsData: updatedSkills,
      };
  }
    case actionTypes.UPDATE_SKILL: {
      const { skillId, title,image, status } = payload;
      const updatedSkills = state.skillsData?.map(skill =>
          skill._id === skillId ? { ...skill, title, image, status } : skill
      );
      return {
          ...state,
          skillsData: updatedSkills,
      };
  }
    case actionTypes.DELETE_SKILL: {
      const { skillId, title } = payload;
      const updatedSkills = state.skillsData?.map(skill =>
        skill._id === skillId ? { ...skill, title } : skill
      );
      return {
          ...state,
          skillsData: updatedSkills,
      };
  }

  case actionTypes.CREATE_SUB_SKILL: {
    const { formData } = payload;
    const newSkill = { formData }; 

    return {
      ...state,
      subSkillData: state.subSkillData ? [...state.subSkillData, newSkill] : [newSkill],
    };
}

  case actionTypes.GET_ALL_SUB_SKILLS: {
    return {
      ...state,
      subSkillData: payload,
    };
  }

  case actionTypes.UPDATE_SUB_SKILL_STATUS: {
    const { subskillId, title, description, skill, status } = payload;
    const updatedSkills = state.subSkillData?.map(data =>
        data._id === subskillId ? { ...data, status, title, description, skill } : data
    );
    return {
        ...state,
        subSkillData: updatedSkills,
    };
}
case actionTypes.UPDATE_SUB_SKILL: {
  const { formData, subSkill_id } = payload;
  const updatedSkills = state.subSkillData?.map(skill =>
      skill._id === subSkill_id ? { ...skill, formData, subSkill_id } : skill
  );
  return {
      ...state,
      subSkillData: updatedSkills,
  };
}

case actionTypes.DELETE_SUB_SKILL: {
  const { subskillId, title } = payload;
  const updatedSkills = state.subSkillData?.map(skill =>
    skill._id === subskillId ? { ...skill, title } : skill
  );
  return {
      ...state,
      subSkillData: updatedSkills,
  };
}

    default: { 
      return state;
    }
  }
};

export default skills;
