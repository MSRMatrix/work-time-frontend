import "./App.css";
import { useState } from "react";
import { Timelog, User } from "./components/context/Context";
import {
  BrowserRouter,
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import Startsite from "./components/startsite/Startsite";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login"
import Tutorial from "./components/tutorial/Tutorial";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard"

function App() {
  const [user, setUser] = useState([]);
  const [timelog, setTimelog] = useState([]);

  const router = createBrowserRouter([
    {
      element: <Home />,
      path: "/",
      children: [
        { element: <Startsite />, path: "/" },
        { element: <Registration />, path: "/registration" },
        { element: <Login />, path: "/login" },
        { element: <Tutorial />, path: "/tutorial" },
        { element: <Dashboard /> , path: "/dashboard"}
      ],
    },
  ]);

  return (
    <>
      <User.Provider value={{ user, setUser }}>
        <Timelog.Provider value={{ timelog, setTimelog }}>
          <RouterProvider router={router} />
        </Timelog.Provider>
      </User.Provider>
    </>
  );
}

export default App;
