import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useContext, useEffect } from "react";
import { Time, User } from "../context/Context";
import { getData } from "../dashboard/table/getData";

const Home = () => {
    const {time, setTime} = useContext(Time);
    const {user, setUser} = useContext(User)
    useEffect(() => {
        getData(setTime, setUser)
    },[])
    return (
    <>
    <Header />
    <Outlet />
    </>
    )
}

export default Home;