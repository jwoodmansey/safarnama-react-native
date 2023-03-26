import { spawn } from "redux-saga/effects";
import experienceSaga from "./experience/experienceSaga";

export default function* rootSaga() {
  yield spawn(experienceSaga);
}
