import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import rootReducer from "./rootReducer";
import rootEpic from "./rootEpic";

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // never persist loading or the app could get stuck
  blacklist: ["loading"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware().concat(epicMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };

epicMiddleware.run(rootEpic);
