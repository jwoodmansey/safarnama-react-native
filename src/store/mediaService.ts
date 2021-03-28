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
        // TODO, dont save all as png
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
        .catch((e) => {
          console.error(e);
        })
    // .then(() => {
    //   downloaded += 1;
    // })
  );
  // for (const dl of downloads) {
  // }
  // TODO this isn't working great, probably better to do this at the observable level
  console.log("Starting media download");
  const res = await Promise.all(downloads);
  console.log("Finished download");
  console.log(`Downloaded ${res.length} media`);
  return media;
};

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
