import { Action } from "@reduxjs/toolkit";
import {
  ActionsObservable,
  combineEpics,
  StateObservable,
} from "redux-observable";
import { catchError } from "rxjs/operators";
import experienceEpic from "./experience/experienceEpic";
import geofenceEpic from "./geofence/geofenceEpic";

export default (
  action$: ActionsObservable<Action>,
  store$: StateObservable<any>,
  dependencies: any
) =>
  combineEpics(experienceEpic, geofenceEpic)(
    action$,
    store$,
    dependencies
  ).pipe(
    catchError((error, source) => {
      // eslint-disable-next-line no-console
      console.error("global catchError hit");
      console.error(error);
      return source;
    })
  );
