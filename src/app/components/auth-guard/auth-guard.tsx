import { ReactNode, useContext } from "react";
import UserContext from "../../contexts/user-context";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user } = useContext(UserContext);

  return !!user ? <>{children}</> : <Navigate to="/" />;
};

export default AuthGuard;
