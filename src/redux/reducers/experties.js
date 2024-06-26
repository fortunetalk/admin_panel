import * as actionTypes from "../actionTypes";

const initialState = {
  expertiesData: null,
  activeExpertiseData: null,
  mainExpertiesData: null,
};
 
const experites = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_EXPERTIES: {
      return {
        ...state, 
        expertiesData: payload,
      };
    }
    case actionTypes.GET_ALL_EXPERTIES: {
      return {
        ...state, 
        expertiesData: payload,
      };
    }
    case actionTypes.GET_ALL_ACTIVE_EXPERTIES: {
      return {
        ...state, 
        activeExpertiseData: payload,
      };
    }

    case actionTypes.SET_ALL_MAIN_EXPERTIES: {
      return {
        ...state,
        mainExpertiesData: payload,
      };
    }

    case actionTypes.UPDATE_EXPERTISE_STATUS: {
      const { expertiseId, status } = payload;
      const updatedStates = state.expertiesData?.map(data =>
          data._id === expertiseId ? { ...data, status } : data
      );
      return {
          ...state,
          expertiesData: updatedStates,
      };
  }

  case actionTypes.UPDATE_EXPERTIES: {
    const { expertiseId, data } = payload;
    const updatedRemedies = state.expertiesData?.map(item =>
        item._id === expertiseId ? { ...item, expertiseId, data } : item
    );
    return {
        ...state,
        remediesData: updatedRemedies,
    };
}
case actionTypes.DELETE_EXPERTIES: {
  const { expertiseId, title } = payload;
  const updatedRemedies = state.expertiesData?.map(data =>
    data._id === expertiseId ? { ...data, title } : data
  );
  return {
      ...state,
      remediesData: updatedRemedies,
  };
}


    default: {
      return state;
    }
  }
};

export default experites;
