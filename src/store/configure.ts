import AsyncStorage from "@react-native-community/async-storage";
import crashlytics from "@react-native-firebase/crashlytics";
import { configureStore } from "@reduxjs/toolkit";
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
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// Temporary workaround - see https://github.com/redux-saga/redux-saga/issues/2709
const createSagaMiddleware = require("redux-saga");

const sagaMiddleware = createSagaMiddleware.default({
  onError(error: any, errorInfo: any) {
    console.error("global catchError hit");
    console.error({ error, errorInfo });
    try {
      crashlytics().recordError(error);
    } catch (e) {
      console.log("Cannot parse error");
    }
  },
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // never persist loading or the app could get stuck
  blacklist: ["loading"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };

sagaMiddleware.run(rootSaga);
