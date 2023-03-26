import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootEpic from "./rootEpic";
import rootSaga from "./rootSaga";

const epicMiddleware = createEpicMiddleware();
const sagaMiddleware = createSagaMiddleware();

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
})
  .concat(epicMiddleware)
  .concat(sagaMiddleware);

// flipper redux debugger
if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // never persist loading or the app could get stuck
  blacklist: ["loading"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

const persistor = persistStore(store);

export { store, persistor };

epicMiddleware.run(rootEpic);
sagaMiddleware.run(rootSaga);
