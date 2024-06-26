import * as actionTypes from "../actionTypes";

const initialState = {
  countryData: null, 
  countryStateData:null,
  stateData: null,
  stateCityData: null,
  cityData:null
};

const setting = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {

    case actionTypes.CREATE_COUNTRY: {
      return {
        ...state,
        countryData: payload
      };
  }

    case actionTypes.GET_ALL_COUNTRY: {
      return {
        ...state,
        countryData: payload,
      };
    }
    case actionTypes.COUNTRY_STATE_LIST: {
      return {
        ...state,
        countryStateData: payload
      };
  }
    case actionTypes.STATE_CITY_LIST: {
      return {
        ...state,
        stateCityData: payload
      };
  }

    case actionTypes.UPDATE_COUNTRY_STATUS: {
        const { countryId, status } = payload;
        const updatedSkills = state.countryData?.map(skill =>
            skill._id === countryId ? { ...skill, status } : skill
        );
        return {
            ...state,
            countryData: updatedSkills,
        };
    }
    case actionTypes.UPDATE_COUNTRY: {
      const { countryId, formData } = payload;
      const updatedSkills = state.countryData?.map(country =>
          country._id === countryId ? { ...country, countryId, formData } : country
      );
      return {
          ...state,
          countryData: updatedSkills,
      };
  }
    case actionTypes.DELETE_COUNTRY: {
        const { countryId, title } = payload;
        const updatedSkills = state.countryData?.map(skill =>
          skill._id === countryId ? { ...skill, title } : skill
        );
        return {
            ...state,
            countryData: updatedSkills,
        };
    }


    case actionTypes.CREATE_STATE: {
      return {
        ...state,
        stateData: payload
      };
  }

    case actionTypes.GET_ALL_STATE: {
      return {
        ...state,
        stateData: payload,
      };
    }

    case actionTypes.UPDATE_STATE_STATUS: {
        const { stateId, status } = payload;
        const updatedStates = state.stateData?.map(skill =>
            skill._id === stateId ? { ...skill, status } : skill
        );
        return {
            ...state,
            stateData: updatedStates,
        };
    }
    case actionTypes.UPDATE_STATE: {
      const { stateId, formData } = payload;
      const updatedSkills = state.stateData?.map(country =>
          country._id === stateId ? { ...country, stateId, formData } : country
      );
      return {
          ...state,
          stateData: updatedSkills,
      };
  }
    case actionTypes.DELETE_STATE: {
        const { stateId, title } = payload;
        const updatedSkills = state.stateData?.map(skill =>
          skill._id === stateId ? { ...skill, title } : skill
        );
        return {
            ...state,
            stateData: updatedSkills,
        };
    }
    case actionTypes.CREATE_CITY: {
      return {
        ...state,
        cityData: payload
      };
  }

    case actionTypes.GET_ALL_CITY: {
      return {
        ...state,
        cityData: payload,
      };
    }

    case actionTypes.UPDATE_CITY_STATUS: {
        const { cityId, status } = payload;
        const updatedStates = state.cityData?.map(skill =>
            skill._id === cityId ? { ...skill, status } : skill
        );
        return {
            ...state,
            cityData: updatedStates,
        };
    }
    case actionTypes.UPDATE_CITY: {
      const { cityId, formData } = payload;
      const updatedSkills = state.cityData?.map(country =>
          country._id === cityId ? { ...country, cityId, formData } : country
      );
      return {
          ...state,
          cityData: updatedSkills,
      };
  }
    case actionTypes.DELETE_CITY: {
        const { cityId, title } = payload;
        const updatedSkills = state.stateData?.map(skill =>
          skill._id === cityId ? { ...skill, title } : skill
        );
        return {
            ...state,
            cityData: updatedSkills,
        };
    }


    default: { 
      return state;
    }
  }
};

export default setting;
