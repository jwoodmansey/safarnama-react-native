export enum MediaType {
  Image,
  Video,
  Pdf,
  Audio,
  Text,
  UNSUPPORTED,
}
export function getMediaType(mimetype: string) {
  switch (mimetype) {
    case "image/jpeg":
    case "image/png":
      return MediaType.Image;
    case "video/mp4":
      return MediaType.Video;
    case "application/pdf":
      return MediaType.Pdf;
    case "audio/mpeg":
    case "audio/mp3":
      return MediaType.Audio;
    case "text/plain":
    case "text/html":
      return MediaType.Text;
    default:
      return MediaType.UNSUPPORTED;
  }
}
