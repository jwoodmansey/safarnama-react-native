/* eslint-disable i18next/no-literal-string */
import axios, { AxiosResponse } from "axios";
import { takeEvery, put, call } from "redux-saga/effects";
import { all, select } from "typed-redux-saga";

import RNFetchBlob from "react-native-blob-util";
import { API_BASE_URL } from "../../config";
import {
  ExperienceRefData,
  ExperienceSnapshotData,
} from "../../types/common/experience";
import { getMediaFromExperienceData } from "../mediaService";
import { RootState } from "../rootReducer";
import {
  downloadedMedia,
  downloadExperienceMedia,
  loadedExperience,
  loadedFeaturedExperiences,
  LoadExperience,
  loadExperience,
  loadFeaturedExperiences,
  updateExperiences,
  downloadedMediaItem,
  setWillDownloadMedia,
} from "./experienceReducer";
import { selectExperience, selectExperiences } from "./experienceSelectors";
import { MediaDocument } from "../../types/common/media";

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
  Object.values(experiences)
    .filter((e) => e.played === true)
    .forEach((e) => {
      put(loadExperience({ id: e.data._id }));
    });
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
}

export default function* experienceSaga() {
  yield takeEvery(loadExperience.type, loadExperienceSaga);
  yield takeEvery(loadFeaturedExperiences.type, loadFeaturedExperiencesSaga);
  yield takeEvery(updateExperiences.type, updateExperiencesSaga);
  yield takeEvery(downloadExperienceMedia.type, dowloadExperienceMediaSaga);
}
