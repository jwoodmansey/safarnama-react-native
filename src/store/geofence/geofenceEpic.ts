import { Alert } from "react-native";
import BackgroundGeolocation, {
  Geofence,
} from "react-native-background-geolocation";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import { EMPTY, from, Observable } from "rxjs";
import {
  catchError,
  ignoreElements,
  map,
  mergeMap,
  withLatestFrom,
} from "rxjs/operators";
import { ExperienceSnapshotData } from "../../types/common/experience";
import {
  LoadExperience,
  setSelectedExperience,
} from "../experience/experienceReducer";
import { selectCurrentExperience } from "../experience/experienceSelectors";
import { RootState } from "../rootReducer";

async function setGeofences(experience?: ExperienceSnapshotData) {
  await BackgroundGeolocation.removeGeofences();
  const geoFences: Geofence[] = experience?.data.pointOfInterests
    ? experience.data.pointOfInterests.map((place) => ({
        notifyOnExit: false,
        notifyOnEntry: true,
        notifyOnDwell: true,
        identifier: place._id,
        latitude: place.triggerZone.lat,
        longitude: place.triggerZone.lng,
        radius: place.triggerZone.radius,
        extras: {
          name: place.name,
        },
      }))
    : [];
  await BackgroundGeolocation.addGeofences(geoFences);
}

const onSetSelectedExperienceEpic = (
  action$: Observable<any>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<LoadExperience>(setSelectedExperience.type),
    withLatestFrom(state$.pipe(map(selectCurrentExperience))),
    mergeMap(([, experience]) =>
      from(setGeofences(experience)).pipe(
        ignoreElements(),
        catchError((e) => {
          Alert.alert(JSON.stringify(e));
          return EMPTY;
        })
      )
    )
  );

export default combineEpics(onSetSelectedExperienceEpic);
