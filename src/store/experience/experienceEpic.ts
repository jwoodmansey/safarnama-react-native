import { Alert } from "react-native";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import { EMPTY, from, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, ignoreElements, map, mergeMap, tap } from "rxjs/operators";
import { API_BASE_URL } from "../../config";
import { navigate } from "../../nav/NavigationRef";
import { downloadAllMediaForExperience } from "../mediaService";
import { RootState } from "../rootReducer";
import {
  loadExperience,
  loadedFeaturedExperiences,
  loadedExperience,
  loadFeaturedExperiences,
  LoadExperience,
  downloadExperienceMedia,
  downloadedMedia,
} from "./experienceReducer";
import { selectExperience } from "./experienceSelectors";

const loadExperienceEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType<LoadExperience>(loadExperience.type),
    mergeMap(({ payload: { id } }) =>
      ajax.get(`${API_BASE_URL}/experience/${id}/snapshot`).pipe(
        map(({ response }) => loadedExperience({ experience: response }))
        // catchError((e) => of(error(.{ message: e.message }))),
      )
    )
  );

const loadFeaturedExperiencesEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(loadFeaturedExperiences.type),
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

const downloadExperienceMediaEpic = (
  action$: Observable<any>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<LoadExperience>(downloadExperienceMedia.type),
    mergeMap(({ payload: { id } }) =>
      from(
        downloadAllMediaForExperience(selectExperience(state$.value, id)!)
      ).pipe(
        map((media) => downloadedMedia({ media })),
        tap(() => {
          Alert.alert("Download complete", undefined, undefined, {
            onDismiss: () => {
              navigate("MapScreen");
            },
          });
        }),
        catchError((e) => {
          Alert.alert(JSON.stringify(e));
          return EMPTY;
        })
      )
    )
  );

export default combineEpics(
  loadExperienceEpic,
  downloadExperienceMediaEpic,
  loadFeaturedExperiencesEpic
);
