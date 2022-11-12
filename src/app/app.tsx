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
import PostPage from "./pages/post-page/post-page";

const App = () => {
  const [user, setUser] = useState<UserInterface | null>(
    JSON.parse(sessionStorage.getItem("user") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null")
  );
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
      navigate("/user/" + user.uuid);
    },
    [navigate]
  );

  const onLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route index element={<HomePage />}></Route>
            <Route
              path="user/:id"
              element={
                <AuthGuard>
                  <UserProfilePage />
                </AuthGuard>
              }
            ></Route>
            <Route
              path="post/:id"
              element={
                <AuthGuard>
                  <PostPage />
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
