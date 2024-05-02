import ErrorPage from "./Views/ErrorPage";
import LoginView from "./Views/LoginView";
import TopBar from "./Components/TopBar";
import Tests from "./Views/tests";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

export const ModelContext = React.createContext();
//TODO REMOVE TESTS ROUTE WHEN DONE
//TODO Add dependcy on ONAuthChange to rerenderpage if kicked out

const HomePage = lazy(() => import("./Views/HomePageView"));
const Schedule = lazy(() => import("./Views/ScheduleView"));
const Status = lazy(() => import("./Views/StatusView"));
const Settings = lazy(() => import("./Views/SettingsView"));

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
      <Suspense fallback={<h1>Loading</h1>}>
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
      </Suspense>
    </>
  );
}

export default App;
