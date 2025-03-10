export async function getData(setTime, setUser) {
  const URL = import.meta.env.VITE_BACKENDURL;
  try {
    const response = await fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      return console.log(response.statusText);
    } else {
      setTime(data.timelog);
      setUser(data.user);
      return console.log("Daten erfolgreich geladen!");
    }
  } catch (error) {
    console.log(error);
  }
}
