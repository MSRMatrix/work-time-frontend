import { getData } from "../../../getData";

export async function colorHandler(e, setTime, setUser) {
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    try {
      const response = await fetch(`${URL}/timelog/color`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          backgroundColor: formDataObject.backgroundColor,
          fontColor: formDataObject.fontColor,
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