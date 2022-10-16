export interface UserInterface {
  uuid: string;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: any;
  languages: any;
  hobbies: any;
  role: string;
  localisation: UserLocation;
  token: string;
}

interface UserLocation {
  country: string;
  city: string;
}
