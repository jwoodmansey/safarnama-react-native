/* eslint-disable no-underscore-dangle */
import RNFetchBlob from "rn-fetch-blob";
import { ExperienceSnapshotData } from "../types/common/experience";
import { MediaDocument } from "../types/common/media";

const { dirs } = RNFetchBlob.fs;

// eslint-disable-next-line import/prefer-default-export
export const downloadAllMediaForExperience = async (
  experience: ExperienceSnapshotData
): Promise<Record<string, MediaDocument>> => {
  const media: Record<string, MediaDocument> = {};
  experience.data.pointOfInterests?.forEach((place) => {
    if (place.media) {
      place.media.forEach((m) => {
        media[m._id] = m;
      });
    }
  });

  // let downloaded = 0;
  // try {}
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
