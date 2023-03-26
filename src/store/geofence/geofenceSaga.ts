import BackgroundGeolocation, {
  Geofence,
} from "react-native-background-geolocation";
import { call, takeEvery } from "redux-saga/effects";
import { select } from "typed-redux-saga";
import { ExperienceSnapshotData } from "../../types/common/experience";
import { setSelectedExperience } from "../experience/experienceReducer";
import { selectCurrentExperience } from "../experience/experienceSelectors";

async function setGeofences(experience?: ExperienceSnapshotData) {
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
        extras: {
          name: place.name,
        },
      }))
    : [];
  await BackgroundGeolocation.addGeofences(geoFences);
}

function* setupGeofences() {
  const experience = yield* select(selectCurrentExperience);
  yield call(setGeofences, experience);
}

export default function* geofenceSaga() {
  yield takeEvery(setSelectedExperience.type, setupGeofences);
}
