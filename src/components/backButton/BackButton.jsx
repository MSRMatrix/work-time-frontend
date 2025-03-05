import { NavLink } from "react-router-dom"

const BackButton = ({text}) => {
    return(<>
    <NavLink to={text}>Back</NavLink>
    </>)
}

export default BackButton;