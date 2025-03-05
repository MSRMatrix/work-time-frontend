export async function sendMonthDataToServer(month, year, daysArray, setTime) {
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
          dayOff: 0,
          sickDay: 0,
          holiday: 0,
          actualTime: 0,
          targetValue: 0,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (!response.ok) {
        throw new Error(data.message || "Es gab einen Fehler beim Speichern");
      }else{
        setTime(data)
       return console.log("Monatsdaten erfolgreich gesendet:", data);
      }
      
    } catch (error) {
      console.error("Fehler beim Senden der Monatsdaten:", error);
    }
  }
  