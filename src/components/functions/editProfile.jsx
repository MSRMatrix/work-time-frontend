import { getData } from "./getData";

export async function editProfile(e, setTime, setUser) {
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    try {
      const response = await fetch(`${URL}/user/time`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formDataObject.name,
          company: formDataObject.company,
          holiday: formDataObject.holiday,
          dayOff: formDataObject.dayOff,
          sickDay: formDataObject.sickDay,
          totalHours: formDataObject.totalHours,
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