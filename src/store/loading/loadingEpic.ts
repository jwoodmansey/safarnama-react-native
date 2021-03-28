import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { mapTo } from "rxjs/operators";
import {
  downloadedMedia,
  errorDownloadingMedia,
  downloadExperienceMedia,
} from "../experience/experienceReducer";
import { startLoading, stopLoading } from "./loadingReducer";

const startLoadingEpic = (action$: Observable<any>) =>
  action$.pipe(ofType(downloadExperienceMedia.type), mapTo(startLoading()));

const stopLoadingEpic = (action$: Observable<any>) =>
  action$.pipe(
    ofType(errorDownloadingMedia.type, downloadedMedia.type),
    mapTo(stopLoading())
  );

export default combineEpics(startLoadingEpic, stopLoadingEpic);
