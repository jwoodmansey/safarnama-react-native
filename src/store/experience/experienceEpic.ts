import { Alert } from "react-native";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import RNFetchBlob from "rn-fetch-blob";
import { combineLatest, EMPTY, from, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { API_BASE_URL } from "../../config";
import { translateOutsideComponent } from "../../i18n/config";
import { MediaDocument } from "../../types/common/media";
import { getMediaFromExperienceData, removeMedia } from "../mediaService";
import { RootState } from "../rootReducer";
import {
  downloadedMedia,
  downloadExperienceMedia,
  errorDownloadingMedia,
  loadedExperience,
  loadedFeaturedExperiences,
  loadExperience,
  LoadExperience,
  loadFeaturedExperiences,
  removedExperience,
  removeExperience,
  updateExperiences,
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
        tap((response) => console.log("Loaded experiences", response)),
        map(({ response }) =>
          loadedFeaturedExperiences({ featuredExperiences: response })
        ),
        catchError((e) => {
          Alert.alert("Error", JSON.stringify(e));
          return EMPTY;
        })
      )
    )
  );

const updateExperiencesEpic = (
  action$: Observable<any>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(updateExperiences.type),
    withLatestFrom(state$.pipe(map(selectExperiences))),
    mergeMap(([, experiences]) =>
      of(
        ...Object.values(experiences)
          .filter((e) => e.played === true)
          .map((e) => loadExperience({ id: e.data._id }))
      )
    )
  );

const { dirs } = RNFetchBlob.fs;

// Would be good to display progress of downloads, revisit
function downloadMedia(media: MediaDocument): Observable<MediaDocument> {
  return new Observable((observer) => {
    RNFetchBlob.config({
      path: `${dirs.DocumentDir}/${media._id}`,
      // TODO, dont save all as png
      timeout: 10000,
      appendExt: ".png",
    })
      .fetch("GET", media.path)
      .progress(() => {
        console.log("PROGRESS");
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => {
        observer.next(media);
      })
      .finally(() => {
        observer.complete();
      });
  });
}

const downloadExperienceMediaEpic = (
  action$: Observable<any>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<LoadExperience>(downloadExperienceMedia.type),
    switchMap(({ payload: { id } }) => {
      const media = getMediaFromExperienceData(
        selectExperience(state$.value, id)!
      );
      return combineLatest(
        Object.values(media).map((m) => downloadMedia(m))
      ).pipe(
        map((m) =>
          downloadedMedia({
            experienceId: id,
            media: m.reduce(
              (prev, curr) => ({
                ...prev,
                [curr._id]: curr,
              }),
              {}
            ),
          })
        ),
        catchError(() => of(errorDownloadingMedia()))
      );
    })
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
            Alert.alert(
              translateOutsideComponent("manage:experienceRemoved"),
              undefined,
              undefined
            );
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
  removeExperienceEpic,
  updateExperiencesEpic
);
