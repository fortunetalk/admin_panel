import * as actionTypes from "../actionTypes";

const initialState = {
  remediesData: null,
  activeRemediesData: null,
  isLoading: false,
};
 
const remedies = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.UNSET_IS_LOADING:{
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionTypes.CREATE_REMEDY: {
      return {
        ...state,
        remediesData: payload
      };
  }

    case actionTypes.GET_ALL_REMEDIES: {
      return {
        ...state,
        remediesData: payload,
      };
    }
    case actionTypes.GET_ALL_ACTIVE_REMEDIES: {
      return {
        ...state,
        activeRemediesData: payload,
      };
    }


    case actionTypes.CHANGE_REMEDY_STATUS: {
        const { remediesId, status } = payload;
        const updatedRemedies = state.remediesData?.map(data =>
            data._id === remediesId ? { ...data, status, remediesId } : data
        );
        return {
            ...state,
            remediesData: updatedRemedies,
        };
    }
    case actionTypes.UPDATE_REMEDY: {
      const { remedy_id, formData } = payload;
      const updatedRemedies = state.remediesData?.map(data =>
          data._id === remedy_id ? { ...data, remedy_id, formData } : data
      );
      return {
          ...state,
          remediesData: updatedRemedies,
      };
  }
    case actionTypes.DELETE_REMEDY: {
        const { remediesId, title } = payload;
        const updatedRemedies = state.remediesData?.map(data =>
          data._id === remediesId ? { ...data, title } : data
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

export default remedies;
