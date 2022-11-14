import moment from "moment";
import { UserInterface } from "./user.interface";

export interface PostInterface {
  uuid: string;
  title: string;
  description: string;
  creationTimestamp: moment.Moment;
  activeFrom: moment.Moment | null;
  activeTo: moment.Moment | null;
  type: string;
  participants: number;
  startPoint: string;
  endPoint: string;
  active: boolean;
  author: UserInterface | null;
  mainImage: string;
  images: string[];
}
