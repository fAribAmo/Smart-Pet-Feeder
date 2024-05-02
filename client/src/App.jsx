import HomePage from "./Views/HomePageView";
import Schedule from "./Views/ScheduleView";
import Status from "./Views/StatusView";
import Settings from "./Views/SettingsView";
import ErrorPage from "./Views/ErrorPage";
import LoginView from "./Views/LoginView";
import TopBar from "./Components/TopBar";
import Tests from "./Views/tests";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

export const ModelContext = React.createContext();
//TODO REMOVE TESTS ROUTE WHEN DONE
function App() {
  const tokenStorageKey = "token";
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(tokenStorageKey);
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <TopBar loggedIn={loggedIn} logOut={() => setLoggedIn(false)} />
      <ModelContext.Provider value={loggedIn}>
        <Routes>
          <Route path="/tests" element={<Tests />} />
          <Route
            path="/"
            element={
              loggedIn ? (
                <HomePage />
              ) : (
                <LoginView
                  storageKey={tokenStorageKey}
                  login={() => setLoggedIn(true)}
                />
              )
            }
          />
          <Route
            path="/schedule"
            element={loggedIn ? <Schedule /> : <Navigate to={"/"} />}
          />
          <Route
            path="/status"
            element={loggedIn ? <Status /> : <Navigate to={"/"} />}
          />
          <Route
            path="/settings"
            element={loggedIn ? <Settings /> : <Navigate to={"/"} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ModelContext.Provider>
    </>
  );
}

export default App;
