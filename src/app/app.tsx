import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/home-page/home-page";
import NotFound from "./pages/not-found/not-found";
import AppContainer from "./components/app-container/app-container";
import UserContext from "./contexts/user-context";
import { useCallback, useState } from "react";
import { UserInterface } from "./interfaces/user.interface";

const App = () => {
  const [user, setUser] = useState<UserInterface | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const navigate = useNavigate();

  const onLogin = useCallback(
    (user: UserInterface) => {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/kek");
    },
    [navigate]
  );

  const onLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<HomePage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
