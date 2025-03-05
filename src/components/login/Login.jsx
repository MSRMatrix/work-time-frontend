import { useNavigate } from "react-router-dom";
import BackButton from "../backButton/BackButton";

const Login = () => { 
    const navigate = useNavigate();

    async function loginData(e){
     e.preventDefault()
     const URL = import.meta.env.VITE_BACKENDURL;
     const formData = new FormData(e.target);
     const formDataObject = {};
     formData.forEach((value, key) => {
         formDataObject[key] = value;
     })
     try{
         const response = await fetch(`${URL}/user/login`,{
             method: "POST",
             headers:{
                 "Content-Type": "application/json",
             },
             credentials: "include",
             body: JSON.stringify({
               password: formDataObject.password,
               email: formDataObject.email,
             }),  
         });
         const data = await response.json();
         if(!response.ok){
            return console.log(data.message);
         }else{
             console.log("Login erfolgreich!");
             navigate("/dashboard")
         }
     }catch(error){
        return alert(error)
     }
    }
    return (
        <div className="form-style">
        <form action="" onSubmit={(e) => loginData(e)}>
        <fieldset>
          <legend>Login</legend>
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
    )
}

export default Login;