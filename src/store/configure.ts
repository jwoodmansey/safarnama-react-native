import AsyncStorage from "@react-native-community/async-storage";
import crashlytics from "@react-native-firebase/crashlytics";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware({
  onError(error, errorInfo) {
    console.error("global catchError hit");
    console.error({ error, errorInfo });
    try {
      crashlytics().recordError(error);
    } catch (e) {
      console.log("Cannot parse error");
    }
  },
});

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
}).concat(sagaMiddleware);

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

sagaMiddleware.run(rootSaga);
