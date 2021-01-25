/* eslint-disable no-underscore-dangle */
import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { ExperienceSnapshotData } from "../types/common/experience";
import { MediaDocument } from "../types/common/media";

const { dirs } = RNFetchBlob.fs;

export const downloadAllMediaForExperience = async (
  experience: ExperienceSnapshotData
): Promise<Record<string, MediaDocument>> => {
  const media = getMediaFromExperienceData(experience);
  const downloads = Object.keys(media).map(
    (mediaId) =>
      RNFetchBlob.config({
        path: `${dirs.DocumentDir}/${mediaId}`,
        appendExt: ".png",
      })
        .fetch("GET", media[mediaId].path)
        .then((res) => {
          console.log("Get complete");
          media[mediaId] = {
            ...media[mediaId],
            localPath: res.path(),
          };
        })
    // .then(() => {
    //   downloaded += 1;
    // })
  );
  console.log("Starting media download");
  const res = await Promise.all(downloads);
  console.log("Finished download");
  console.log(`Downloaded ${res.length} media`);
  return media;
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
