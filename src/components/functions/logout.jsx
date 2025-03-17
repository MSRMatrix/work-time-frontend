export async function logout(navigate) {
    const URL = import.meta.env.VITE_BACKENDURL;
    try{
        const response = await fetch(`${URL}/user/logout`,{
            method: "POST",
            headers:{
               "Content-Type": "application/json",
            },
            credentials: "include", 
        })
        if(!response.ok){
            return alert("Logout went wrong. Please try again!")
        } else{
            console.log(`Logout erfolgreich!`);
            navigate("/")
        }
    }catch(error){
        console.log(error);
        
    }
}