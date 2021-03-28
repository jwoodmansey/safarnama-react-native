export type MediaDocument = {
  mimetype: string;
  md5: string;
  _id: any;
  path: string;
  thumbPath: string;
  created_at?: Date;
  updated_at?: Date;
  size: number;
  ownerId: string;
  name?: string;
  description?: string;
  acknowledgements?: string;
  associatedExperiences?: string[];
  localPath?: string;
  externalLinks: { name: string; url: string }[];
};
