import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import experienceReducer from "./experience/experienceReducer";
import rootEpic from "./rootEpic";

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  experience: experienceReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // Firebase will persist this anyway,
  // never persist loading or the app could get stuck
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware().concat(epicMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
