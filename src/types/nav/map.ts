import { MediaDocument } from "../common/media";
import { PointOfInterestDocument } from "../common/point-of-interest";

export type MapNaviationProp = {
  MapScreen: {};
  PDFScreen: { media: MediaDocument };
  ImageScreen: { media: MediaDocument };
  PlaceListScreen: undefined;
  ViewPlaceScreen: {
    place?: PointOfInterestDocument;
    placeId: string;
    name: string;
  };
};
