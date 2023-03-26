/* eslint-disable i18next/no-literal-string */
import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import RNFetchBlob from "react-native-blob-util";
import { call, put, takeEvery } from "redux-saga/effects";
import { all, select } from "typed-redux-saga";
import { API_BASE_URL } from "../../config";
import { translateOutsideComponent } from "../../i18n/config";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { MediaDocument } from "../../types/common/media";
import { getMediaFromExperienceData, removeMedia } from "../mediaService";
import { RootState } from "../rootReducer";
import {
  downloadedMedia,
  downloadedMediaItem,
  downloadExperienceMedia,
  errorDownloadingMedia,
  loadedExperience,
  loadedFeaturedExperiences,
  LoadExperience,
  loadExperience,
  loadFeaturedExperiences,
  removedExperience,
  removeExperience,
  setWillDownloadMedia,
  updateExperiences,
} from "./experienceReducer";
import { selectExperience, selectExperiences } from "./experienceSelectors";

function* loadExperienceSaga(action: LoadExperience) {
  const { id } = action.payload;
  const response: AxiosResponse<ExperienceSnapshotData> = yield call(
    axios.get,
    `${API_BASE_URL}/experience/${id}/snapshot`
  );
  yield put(loadedExperience({ experience: response.data }));
}

function* loadFeaturedExperiencesSaga() {
  const response: AxiosResponse<ExperienceRefData[]> = yield call(
    axios.get,
    `${API_BASE_URL}/experiences/featured`
  );
  yield put(loadedFeaturedExperiences({ featuredExperiences: response.data }));
}

function* updateExperiencesSaga() {
  const experiences = yield* select(selectExperiences);
  yield all(
    Object.values(experiences)
      .filter((e) => e.played === true)
      .map((e) => put(loadExperience({ id: e.data._id })))
  );
}

const { dirs } = RNFetchBlob.fs;
function* downloadMediaItemSaga(media: MediaDocument) {
  yield call(
    RNFetchBlob.config({
      path: `${dirs.DocumentDir}/${media._id}`,
      // TODO, dont save all as png
      timeout: 10000,
      appendExt: ".png",
    }).fetch,
    "GET",
    media.path
  );
  yield put(downloadedMediaItem({ id: media._id }));
}

function* dowloadExperienceMediaSaga(action: LoadExperience) {
  const { id } = action.payload;
  const experience = yield* select((store: RootState) =>
    selectExperience(store, id)
  );
  if (!experience) return;
  const allMedia = getMediaFromExperienceData(experience);

  const mediaArray = [...Object.values(allMedia)];
  try {
    yield put(setWillDownloadMedia({ media: mediaArray.map((m) => m._id) }));
    yield all(mediaArray.map((media) => call(downloadMediaItemSaga, media)));
    yield put(
      downloadedMedia({
        experienceId: id,
        media: mediaArray.reduce(
          (prev, curr) => ({
            ...prev,
            [curr._id]: {
              ...curr,
              localPath: `${dirs.DocumentDir}/${curr._id}`,
            },
          }),
          {}
        ),
      })
    );
  } catch (e) {
    yield put(errorDownloadingMedia());
  }
}

function* removeExperienceSaga(action: LoadExperience) {
  const { id } = action.payload;
  const experiences = yield* select(selectExperiences);

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
  yield call(removeMedia, mediaNotInUse);
  yield put(
    removedExperience({
      id,
      removedMedia: mediaNotInUse.map((m) => m._id),
    })
  );
  Alert.alert(
    translateOutsideComponent("manage:experienceRemoved"),
    undefined,
    undefined
  );
}

export default function* experienceSaga() {
  yield takeEvery(loadExperience.type, loadExperienceSaga);
  yield takeEvery(loadFeaturedExperiences.type, loadFeaturedExperiencesSaga);
  yield takeEvery(updateExperiences.type, updateExperiencesSaga);
  yield takeEvery(downloadExperienceMedia.type, dowloadExperienceMediaSaga);
  yield takeEvery(removeExperience.type, removeExperienceSaga);
}
