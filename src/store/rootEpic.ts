import { Action } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics, StateObservable } from "redux-observable";
import experienceEpic from './experience/experienceEpic'
import { catchError } from 'rxjs/operators'

export default (
  action$: ActionsObservable<Action>,
  store$: StateObservable<any>, dependencies: any,
) => combineEpics(
  experienceEpic
)(action$, store$, dependencies).pipe(
  catchError((error, source) => {
    // eslint-disable-next-line no-console
    console.error('global catchError hit');
    console.error(error);
    return source;
  }),
);
