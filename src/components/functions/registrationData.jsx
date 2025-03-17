
export async function registrationData(e, navigate){
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