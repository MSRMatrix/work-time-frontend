import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { Time, User } from "../context/Context";

const Home = () => {
  const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

   async function getData(setTime, setUser) {
    const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        navigate("/")
        return console.log(response.statusText);
      } else {
        setTime(data.timelog);
        setUser(data.user);
        navigate("/dashboard")
        return console.log("Daten erfolgreich geladen!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getData(setTime, setUser)
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
