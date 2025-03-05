import { NavLink, Outlet } from "react-router-dom";

const Startsite = () => {
    return (
        <>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/registration">Registration</NavLink>
        <NavLink to="/tutorial">Tutorial</NavLink>
        </>
    )
}

export default Startsite;