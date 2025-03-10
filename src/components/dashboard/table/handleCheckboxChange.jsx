import { getData } from "./getData";

export async function handleCheckboxChange(e, date, setTime, setUser) {
  const { name, value } = e.target;
  const URL = import.meta.env.VITE_BACKENDURL;
  try {
    const response = await fetch(`${URL}/timelog/check`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        value: value,
        date: date,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return alert(response.statusText);
    } else {
      getData(setTime, setUser);
      return console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}
