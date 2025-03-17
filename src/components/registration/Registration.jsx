import { useNavigate } from "react-router-dom";
import BackButton from "../backButton/BackButton";
import { registrationData } from "../functions/registrationData";

const Registration = () => {
  const navigate = useNavigate();
  return (
    <div className="form-style">
      <form action="" onSubmit={(e) => registrationData(e, navigate)}>
        <fieldset>
          <legend>Registration</legend>

          <fieldset>
            <legend>Name</legend>
            <input name="name" type="text" required />
          </fieldset>

          <fieldset>
            <legend>Company</legend>
            <input name="company" type="text" required />
          </fieldset>

          <fieldset>
            <legend>Email</legend>
            <input name="email" type="email" required />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <input name="password" type="password" required />
          </fieldset>

          <button type="submit">Registrieren</button>
        </fieldset>
      </form>
      <BackButton text={"/"} />
    </div>
  );
};

export default Registration;
