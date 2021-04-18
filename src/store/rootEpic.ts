import { Action } from "@reduxjs/toolkit";
import {
  ActionsObservable,
  combineEpics,
  StateObservable,
} from "redux-observable";
import { catchError } from "rxjs/operators";
import experienceEpic from "./experience/experienceEpic";
import geofenceEpic from "./geofence/geofenceEpic";
import loadingEpic from "./loading/loadingEpic";

export default (
  action$: ActionsObservable<Action>,
  store$: StateObservable<any>,
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
      return source;
    })
  );
