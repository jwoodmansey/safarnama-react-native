import { spawn } from "redux-saga/effects";
import experienceSaga from "./experience/experienceSaga";
import geofenceSaga from "./geofence/geofenceSaga";

export default function* rootSaga() {
  yield spawn(experienceSaga);
  yield spawn(geofenceSaga);
}
