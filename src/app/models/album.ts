export interface IAlbum {
  id: number;
  name: string;
  cover: string;
  releaseDate: Date;
  description: string;
  genre: string;
  recordLabel: string;
  tracks: [];
  performers: [];
  comments: [];
}
