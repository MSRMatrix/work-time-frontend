import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const Home = () => {
    return (
    <>
    <Header />
    <Outlet />
    </>
    )
}

export default Home;