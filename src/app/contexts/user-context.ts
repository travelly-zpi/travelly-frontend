import React from "react";
import { UserInterface } from "../interfaces/user.interface";
import { UserDtoInterface } from "../interfaces/user-dto.interface";

interface UserContextInterface {
  user: UserInterface | null;
  onLogin: (user: UserInterface, remember: boolean) => void;
  onLogout: () => void;
  decodeUser: (user: UserDtoInterface) => UserInterface;
  encodeUser: (user: UserInterface) => UserDtoInterface;
}

const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface
);

export default UserContext;
