import React from "react";
import { UserInterface } from "../interfaces/user.interface";

interface UserContextInterface {
  user: UserInterface | null;
  onLogin: (user: UserInterface, remember: boolean) => void;
  onLogout: () => void;
  warningShown: boolean;
  setWarningShown: Function;
}

const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface
);

export default UserContext;
