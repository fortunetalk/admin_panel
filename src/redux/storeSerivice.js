import store from "./Store";

export const getChatHistoryPayload = () => {
  const state = store.getState();
  return state.history.chatHistoryApiPayload;
};
