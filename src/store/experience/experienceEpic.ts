import { Alert } from "react-native";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import { EMPTY, from, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { API_BASE_URL } from "../../config";
import { navigate } from "../../nav/NavigationRef";
import { MediaDocument } from "../../types/common/media";
import {
  downloadAllMediaForExperience,
  getMediaFromExperienceData,
  removeMedia,
} from "../mediaService";
import { RootState } from "../rootReducer";
import {
  downloadedMedia,
  downloadExperienceMedia,
  loadedExperience,
  loadedFeaturedExperiences,
  loadExperience,
  LoadExperience,
  loadFeaturedExperiences,
  removedExperience,
  removeExperience,
} from "./experienceReducer";
import { selectExperience, selectExperiences } from "./experienceSelectors";

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
        map((media) => downloadedMedia({ media, experienceId: id })),
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

const removeExperienceEpic = (
  action$: Observable<any>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<LoadExperience>(removeExperience.type),
    withLatestFrom(state$.pipe(map(selectExperiences))),
    mergeMap(
      ([
        {
          payload: { id },
        },
        experiences,
      ]) => {
        // Find all media in use in the app outside of this experience
        // We cannot remove this media
        const mediaInUse = Object.values(experiences)
          .filter((e) => e.data._id !== id)
          .reduce(
            (prev, curr) => ({
              ...prev,
              ...getMediaFromExperienceData(curr),
            }),
            {} as Record<string, MediaDocument>
          );
        const thisExperienceMedia = getMediaFromExperienceData(experiences[id]);
        const mediaNotInUse = Object.values(thisExperienceMedia).filter(
          (m) => mediaInUse[m._id] === undefined
        );
        return from(removeMedia(mediaNotInUse)).pipe(
          map(() =>
            removedExperience({
              id,
              removedMedia: mediaNotInUse.map((m) => m._id),
            })
          ),
          tap(() => {
            Alert.alert("Experience removed", undefined, undefined);
          }),
          catchError((e) => {
            Alert.alert(JSON.stringify(e));
            return EMPTY;
          })
        );
      }
    )
  );

export default combineEpics(
  loadExperienceEpic,
  downloadExperienceMediaEpic,
  loadFeaturedExperiencesEpic,
  removeExperienceEpic
);
