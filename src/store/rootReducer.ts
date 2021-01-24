import { combineReducers } from "@reduxjs/toolkit";
import experienceReducer from "./experience/experienceReducer";

const rootReducer = combineReducers({
  experience: experienceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootDispatch = typeof rootReducer.dispatch;

export default rootReducer;
