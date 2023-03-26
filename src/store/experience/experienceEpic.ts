import { Alert } from "react-native";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import { EMPTY, from, Observable } from "rxjs";
import { catchError, map, mergeMap, tap, withLatestFrom } from "rxjs/operators";
import { translateOutsideComponent } from "../../i18n/config";
import { MediaDocument } from "../../types/common/media";
import { getMediaFromExperienceData, removeMedia } from "../mediaService";
import { RootState } from "../rootReducer";
import {
  LoadExperience,
  removedExperience,
  removeExperience,
} from "./experienceReducer";
import { selectExperiences } from "./experienceSelectors";

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
            // Alert.alert(JSON.stringify(e));
            return EMPTY;
          })
        );
      }
    )
  );

export default combineEpics(removeExperienceEpic);
