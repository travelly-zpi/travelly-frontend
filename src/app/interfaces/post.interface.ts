import moment from "moment";

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
  author: {
    uuid: string;
    email: string;
  };
  mainImageUrl: string;
  imagesUrls: string[];
}
