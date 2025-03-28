import { getData } from "./getData";

export async function sendMonthDataToServer(month, year, daysArray, setTime, setUser) {
    const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/timelog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          month,
          year,
          monthData: daysArray,  
          actualTime: 0,
          targetValue: 0,
        }),
      });
      if (!response.ok) {
        throw new Error("Es gab einen Fehler beim Speichern");
      }else{
        getData(setTime, setUser)
       return console.log("Monatsdaten erfolgreich gesendet");
      }
      
    } catch (error) {
      console.error("Fehler beim Senden der Monatsdaten:", error);
    }
  }
  