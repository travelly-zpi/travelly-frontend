import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/home-page/home-page";
import UserProfilePage from "./pages/user-profile-page/user-profile-page";
import NotFound from "./pages/not-found/not-found";
import AppContainer from "./components/app-container/app-container";
import UserContext from "./contexts/user-context";
import { useCallback, useState } from "react";
import { UserInterface } from "./interfaces/user.interface";
import AuthGuard from "./components/auth-guard/auth-guard";

const App = () => {
  const [user, setUser] = useState<UserInterface | null>(
    JSON.parse(sessionStorage.getItem("user") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null")
  );
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

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
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
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
