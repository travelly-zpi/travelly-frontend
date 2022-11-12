export interface PostDtoInterface {
  uuid: string;
  title: string;
  description: string;
  creationTimestamp: string;
  activeFrom: string;
  activeTo: string;
  type: string;
  participants: number;
  startPoint: string;
  endPoint: string;
  active: boolean;
  author: {
    uuid: string;
    email: string;
  };
  mainImageUrl: string;
  imagesUrls: string[];
}
