import * as actionTypes from "../actionTypes";

const initialState = {
  redirectBannerData: null,
};

const redirectBanner = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.CREATE_REDIRECTION_BANNER: {
      return {
        ...state,
        redirectBannerData: payload
      };
  }
    case actionTypes.GET_REDIRECTION_BANNER: {
      return {
        ...state,
        redirectBannerData: payload,
      };
    }
    case actionTypes.UPDATE_REDIRECTION_BANNER: {
      return {
        ...state,
        redirectBannerData: payload
      };
  }

    case actionTypes.CHANGE_REDIRECTION_BANNER_STATUS: {
      const { bannerId, status } = payload;
      const updatedRemedies = state.redirectBannerData?.map(data =>
          data._id === bannerId ? { ...data, status, bannerId } : data
      );
      return {
          ...state,
          redirectBannerData: updatedRemedies,
      };
  }
  case actionTypes.DELETE_REDIRECTION_BANNER: {
    const { bannerId, title } = payload;
    const updatedRedirectBanner = state.redirectBannerData?.map(data =>
      data._id === bannerId ? { ...data, title, bannerId } : data
    );
    return {
        ...state,
        redirectBannerData: updatedRedirectBanner,
    };
}

    default: {
      return state;
    }
  }
};

export default redirectBanner;
