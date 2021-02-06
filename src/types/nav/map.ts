import { MediaDocument } from "../common/media";
import { PointOfInterestDocument } from "../common/point-of-interest";

export type MapNaviationProp = {
  MapScreen: {};
  PDFScreen: { media: MediaDocument };
  ImageScreen: { media: MediaDocument };
  ViewPlaceScreen: { place: PointOfInterestDocument };
};
