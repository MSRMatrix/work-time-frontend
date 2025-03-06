import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { Time, User } from "../context/Context";

const Home = () => {
    const {time, setTime} = useContext(Time);
    const {user, setUser} = useContext(User)
   async function getData(){
    const URL = import.meta.env.VITE_BACKENDURL;
    try{
        const response = await fetch(`${URL}/user`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", 
            });
            const data = await response.json();
            if(!response.ok){
              return alert(response.statusText)
            }else{
              setTime(data.timelog)
              setUser(data.user)
              return console.log("Daten erfolgreich geladen!");
              
            }
        }catch(error){
            console.log(error);
            
        }
   }
    useEffect(() => {
        getData()
    },[])
    return (
    <>
    <Header />
    <Outlet />
    </>
    )
}

export default Home;