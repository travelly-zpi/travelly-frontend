import moment from "moment";

export interface UserInterface {
  uuid: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: moment.Moment;
  languages: Array<string>;
  description: string;
  localisation: any;
  imageUrl: string;
  imageCreationDate: string;
}
