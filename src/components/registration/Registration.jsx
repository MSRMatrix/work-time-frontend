import { useNavigate } from "react-router-dom";
import BackButton from "../backButton/BackButton";

const Registration = () => {

    const navigate = useNavigate();

   async function registrationData(e){
    e.preventDefault()
    const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    })
    try{
        const response = await fetch(`${URL}/user`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              password: formDataObject.password,
              email: formDataObject.email,
              name: formDataObject.name,
              company: formDataObject.company,
            }),  
        });
        const data = await response.json();
        if(!response.ok){
           return console.log(data.message);
        }else{
            console.log(data);
            navigate("/login")
        }
    }catch(error){
       return alert(error)
    }
   }

  return (
    <div className="form-style">
      <form action="" onSubmit={(e) => registrationData(e)}>
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
