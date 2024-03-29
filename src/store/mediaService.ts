/* eslint-disable i18next/no-literal-string */
import { Platform } from "react-native";
import RNFetchBlob from "react-native-blob-util";
import { ExperienceSnapshotData } from "../types/common/experience";
import { MediaDocument } from "../types/common/media";

export const removeMedia = async (media: MediaDocument[]) => {
  const promises = media
    .filter((m) => m.localPath !== undefined)
    .map((m) => RNFetchBlob.fs.unlink(m.localPath!));
  await Promise.all(promises);
};

export const getMediaFromExperienceData = (
  experience: ExperienceSnapshotData
): Record<string, MediaDocument> => {
  const media: Record<string, MediaDocument> = {};
  experience.data.pointOfInterests?.forEach((place) => {
    if (place.media) {
      place.media.forEach((m) => {
        media[m._id] = m;
      });
    }
  });
  return media;
};

export const getPath = (media: MediaDocument): string => {
  if (!media.localPath) {
    return media.path;
  }
  return Platform.OS === "android"
    ? `file://${media.localPath}`
    : media.localPath;
};

export const getFullPath = (media: MediaDocument): string => {
  const path = getPath(media);

  if (Platform.OS === "ios") {
    const arr = path.split("/");
    const { dirs } = RNFetchBlob.fs;
    return `${dirs.DocumentDir}/${arr[arr.length - 1]}`;
  }

  return path;
};

export const getHtmlFromFile = (media: MediaDocument) => {
  const fullPath = getFullPath(media);
  return RNFetchBlob.fs.readFile(fullPath, "utf8");
};
