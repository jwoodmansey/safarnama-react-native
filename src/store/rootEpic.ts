import { Action } from "@reduxjs/toolkit";
import {
  ActionsObservable,
  combineEpics,
  StateObservable,
} from "redux-observable";
import { catchError } from "rxjs/operators";
import crashlytics from "@react-native-firebase/crashlytics";
import experienceEpic from "./experience/experienceEpic";
import geofenceEpic from "./geofence/geofenceEpic";
import loadingEpic from "./loading/loadingEpic";
import { RootState } from "./rootReducer";

export default (
  action$: ActionsObservable<Action>,
  store$: StateObservable<RootState>,
  dependencies: any
) =>
  combineEpics(experienceEpic, geofenceEpic, loadingEpic)(
    action$,
    store$,
    dependencies
  ).pipe(
    catchError((error, source) => {
      console.error("global catchError hit");
      console.error(error);
      crashlytics().recordError(error);
      return source;
    })
  );
