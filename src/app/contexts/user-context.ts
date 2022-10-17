import React from "react";
import { UserInterface } from "../interfaces/user.interface";

interface UserContextInterface {
  user: UserInterface | null;
  onLogin: (user: UserInterface, remember: boolean) => void;
  onLogout: () => void;
}

const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface
);

export default UserContext;
