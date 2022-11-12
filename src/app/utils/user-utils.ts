import { UserDtoInterface } from "../interfaces/user-dto.interface";
import { UserInterface } from "../interfaces/user.interface";
import moment from "moment";

const decodeUser = (user: UserDtoInterface): UserInterface => {
  return {
    ...user,
    dateOfBirth: user.dateOfBirth
      ? moment(user.dateOfBirth)
      : moment().subtract(18, "years"),
    languages: user.languages ? JSON.parse(user.languages) : [],
  };
};

const encodeUser = (user: UserInterface): UserDtoInterface => {
  return {
    ...user,
    dateOfBirth: user.dateOfBirth.format("YYYY-MM-DD"),
    languages: JSON.stringify(user.languages),
  };
};

export { decodeUser, encodeUser };
