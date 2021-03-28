import { combineReducers } from "@reduxjs/toolkit";
import experienceReducer from "./experience/experienceReducer";
import loadingReducer from "./loading/loadingReducer";

const rootReducer = combineReducers({
  experience: experienceReducer,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootDispatch = typeof rootReducer.dispatch;

export default rootReducer;
