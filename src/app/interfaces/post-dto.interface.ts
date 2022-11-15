import { ImageInterface } from "./image.interface";

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
    uuid?: string;
    email?: string;
  };
  mainImage: ImageInterface;
  images: ImageInterface[];
}
