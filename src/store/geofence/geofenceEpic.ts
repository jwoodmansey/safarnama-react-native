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
import {
  LoadExperience,
  setSelectedExperience,
} from "../experience/experienceReducer";
import { selectCurrentExperience } from "../experience/experienceSelectors";
import { RootState } from "../rootReducer";

const onSetSelectedExperienceEpic = (
  action$: Observable<any>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<LoadExperience>(setSelectedExperience.type),
    withLatestFrom(state$.pipe(map(selectCurrentExperience))),
    mergeMap(([, experience]) =>
      from(async () => {
        await BackgroundGeolocation.removeGeofences();
        const geoFences: Geofence[] = experience?.data.pointOfInterests
          ? experience.data.pointOfInterests.map((place) => ({
              notifyOnExit: false,
              notifyOnEntry: true,
              notifyOnDwell: false,
              identifier: place._id,
              latitude: place.triggerZone.lat,
              longitude: place.triggerZone.lng,
              radius: place.triggerZone.radius,
            }))
          : [];
        await BackgroundGeolocation.addGeofences(geoFences);
      }).pipe(
        ignoreElements(),
        catchError((e) => {
          Alert.alert(JSON.stringify(e));
          return EMPTY;
        })
      )
    )
  );

export default combineEpics(onSetSelectedExperienceEpic);
