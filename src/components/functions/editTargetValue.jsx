import { getData } from "./getData";

export async function editTargetValue(e, setTime, setUser) {
    console.log(e.preventDefault());
    
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const hours = Number(formDataObject.S) < 10 ? `0${formDataObject.S}S` : `${formDataObject.S}S`
    const minutes = Number(formDataObject.M) < 10 ? `0${formDataObject.M}M` : `${formDataObject.M}M`
    const targetValue = `${hours} ${minutes}`;   
    
    try {
      const response = await fetch(`${URL}/timelog/target-value`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            targetValue: targetValue
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return console.log(data.message);
      } else {
        getData(setTime, setUser);
      }
    } catch (error) {
      return alert(error);
    }
}