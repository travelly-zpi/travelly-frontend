import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/home-page/home-page";
import UserProfilePage from "./pages/user-profile-page/user-profile-page";
import NotFound from "./pages/not-found/not-found";
import AppContainer from "./components/app-container/app-container";
import UserContext from "./contexts/user-context";
import LoadingContext from "./contexts/loading-context";
import { useCallback, useState } from "react";
import { UserInterface } from "./interfaces/user.interface";
import AuthGuard from "./components/auth-guard/auth-guard";
import VerificationPage from "./pages/user-verification-page/user-verification-page";
import { UserDtoInterface } from "./interfaces/user-dto.interface";
import moment from "moment/moment";
import { Spin } from "antd";
import * as React from "react";

const App = () => {
  const [user, setUser] = useState<UserInterface | null>(
    JSON.parse(sessionStorage.getItem("user") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null")
  );
  const [warningShown, setWarningShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = useCallback(
    (user: UserInterface, remember: boolean) => {
      setUser(user);
      if (remember) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/users/" + user.uuid);
    },
    [navigate]
  );

  const onLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

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

  return (
    <UserContext.Provider
      value={{
        user,
        onLogin,
        onLogout,
        warningShown,
        setWarningShown,
        decodeUser,
        encodeUser,
      }}
    >
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route index element={<HomePage />}></Route>
            <Route
              path="users/:id"
              element={
                <AuthGuard>
                  <UserProfilePage />
                </AuthGuard>
              }
            ></Route>
            <Route
              path="register/verify"
              element={<VerificationPage />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
        {loading ? <Spin className="spinner" size="large" /> : null}
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
