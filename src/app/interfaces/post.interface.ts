import moment from "moment";
import { UserInterface } from "./user.interface";

export interface PostInterface {
  uuid: string;
  title: string;
  description: string;
  creationTimestamp: moment.Moment;
  activeFrom: moment.Moment;
  activeTo: moment.Moment;
  type: string;
  participants: number;
  startPoint: string;
  endPoint: string;
  active: boolean;
  author: UserInterface | null;
  mainImageUrl: string;
  imagesUrls: string[];
}
