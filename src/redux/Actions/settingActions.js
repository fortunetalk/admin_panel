import * as actionTypes from "../actionTypes";

export const setIsLoading = () => ({
    type: actionTypes.SET_IS_LOADING,
    payload: true,
});

export const unsetIsLoading = () => ({
    type: actionTypes.UNSET_IS_LOADING,
    payload: false,
});

export const addCountries = payload => ({
    type: actionTypes.CREATE_COUNTRY,
    payload
})
export const getCountries = payload => ({
    type: actionTypes.GET_ALL_COUNTRY,
    payload
})
export const getCountryValue = payload => ({
    type: actionTypes.GET_COUNTRY_VALUE,
    payload
})

export const updateCountryStatus = payload => ({
    type: actionTypes.UPDATE_COUNTRY_STATUS,
    payload
})
export const deleteCountry = payload => ({
    type: actionTypes.DELETE_COUNTRY,
    payload
})
export const updateCountry = ({ formData, countryId }) => ({
    type: actionTypes.UPDATE_COUNTRY,
    payload: { formData, countryId },
});
export const countryStateList = ({ countryId }) => ({
    type: actionTypes.COUNTRY_STATE_LIST,
    payload: { countryId }
})

export const addState = payload => ({
    type: actionTypes.CREATE_STATE,
    payload
})
export const getStates = payload => ({
    type: actionTypes.GET_ALL_STATE,
    payload
})

export const stateCityList = ({ stateId }) => ({
    type: actionTypes.STATE_CITY_LIST,
    payload: { stateId }
})
export const updateStateStatus = payload => ({
    type: actionTypes.UPDATE_STATE_STATUS,
    payload
})
export const deleteState = payload => ({
    type: actionTypes.DELETE_STATE,
    payload
})
export const updateState = ({ formData, stateId }) => ({
    type: actionTypes.UPDATE_STATE,
    payload: { formData, stateId },
});


export const addCity = payload => ({
    type: actionTypes.CREATE_CITY,
    payload
})
export const getCities = payload => ({
    type: actionTypes.GET_ALL_CITY,
    payload
})
export const updateCityStatus = payload => ({
    type: actionTypes.UPDATE_CITY_STATUS,
    payload
})
export const deleteCity = payload => ({
    type: actionTypes.DELETE_CITY,
    payload
})
export const updateCity = ({ formData, cityId }) => ({
    type: actionTypes.UPDATE_CITY,
    payload: { formData, cityId },
});
