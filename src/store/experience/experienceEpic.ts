import { Alert } from "react-native";
import { combineEpics, ofType } from "redux-observable";
import { EMPTY, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { API_BASE_URL } from "../../config";
import {
  loadedExperiences,
  loadedFeaturedExperiences,
  loadExperiences,
  loadFeaturedExperiences,
} from "./experienceReducer";

const loadExperienceEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(loadExperiences.type),
    mergeMap(() =>
      ajax
        .get(`${API_BASE_URL}/experience/5d1ec21b47677179a752e3d2/snapshot`)
        .pipe(
          map(({ response }) => loadedExperiences({ experiences: [response] }))
          // catchError((e) => of(error(.{ message: e.message }))),
        )
    )
  );

const loadFeaturedExperiencesEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(loadFeaturedExperiences.type),
    tap(() => console.log("observable")),
    mergeMap(() =>
      ajax.get(`${API_BASE_URL}/experiences/featured`).pipe(
        map(({ response }) =>
          loadedFeaturedExperiences({ featuredExperiences: response })
        ),
        catchError((e) => {
          Alert.alert(JSON.stringify(e));
          return EMPTY;
        })
      )
    )
  );

export default combineEpics(loadExperienceEpic, loadFeaturedExperiencesEpic);
