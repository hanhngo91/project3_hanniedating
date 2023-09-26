import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import DashBoard from "./pages/DashBoard/DashBoard";
import OnBoarding from "./pages/OnBoarding/OnBoarding";
import { useCookies } from "react-cookie";

import "./App.css";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const AuthToken = cookies.AuthToken;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {AuthToken && <Route path="/dashboard" element={<DashBoard />} />}
        {AuthToken && <Route path="/onboarding" element={<OnBoarding />} />}
      </Routes>
    </div>
  );
}

export default App;
