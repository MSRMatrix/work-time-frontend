import "./App.css";
import { useState } from "react";
import { Time, User } from "./components/context/Context";
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
import Print from "./components/print/Print"

function App() {
  const [user, setUser] = useState([]);
  const [time, setTime] = useState([]);

  const router = createBrowserRouter([
    {
      element: <Home />,
      path: "/",
      children: [
        { element: <Startsite />, path: "/" },
        { element: <Registration />, path: "/registration" },
        { element: <Login />, path: "/login" },
        { element: <Tutorial />, path: "/tutorial" },
        { element: <Dashboard /> , path: "/dashboard"},
        { element: <Print /> , path: "/print"},
      ],
    },
  ]);

  return (
    <>
      <User.Provider value={{ user, setUser }}>
        <Time.Provider value={{ time, setTime }}>
          <RouterProvider router={router} />
        </Time.Provider>
      </User.Provider>
    </>
  );
}

export default App;
