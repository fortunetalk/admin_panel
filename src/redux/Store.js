import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./saga/rootSaga";
import createSagaMiddleware from "redux-saga";
import appReducer from "./reducers/root";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: appReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
