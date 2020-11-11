import { Observable, of } from 'rxjs';
import {
  mergeMap, map, catchError,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { ofType, combineEpics } from 'redux-observable';
import { loadExperiences, loadedExperiences } from "./experienceReducer";

const loadExperiencesEpic = (action$: Observable<any>) => action$.pipe(
  ofType(loadExperiences.type),
  mergeMap(
    () => ajax.get(
      `http://safarnama.lancs.ac.uk/api/experience/5d1ec21b47677179a752e3d2/snapshot`,
    ).pipe(
      map(({ response }) => loadedExperiences({experiences: [response]})),
      // catchError((e) => of(error(.{ message: e.message }))),
    ),
  ),
);

export default combineEpics(loadExperiencesEpic)