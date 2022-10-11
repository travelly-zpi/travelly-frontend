import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/home-page";
import NotFound from "./pages/not-found/not-found";
import AppContainer from "./components/app-container/app-container";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<HomePage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
