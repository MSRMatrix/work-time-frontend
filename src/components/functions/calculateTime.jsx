import { getData } from "./getData";

export async function calculateTime(e, item, time, setTime, setUser) {
  const { name } = e.target;
  
  let oldTime;
  if(item.totalTime){
    oldTime = item.totalTime
  }
  
  const [startH, startM] = item.startWork.split(":").map(Number);
  const [endH, endM] = item.endWork.split(":").map(Number);
  const [startBreakH, startBreakM] = item.startBreak.split(":").map(Number);
  const [endBreakH, endBreakM] = item.endBreak.split(":").map(Number);
  
  // Arbeitszeit berechnen (mit Korrektur für Mitternacht)
  let totalMinutes =
    (endH * 60 + endM) - (startH * 60 + startM);
    
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60; // Falls über Mitternacht gearbeitet wurde, addiere 24h
  }
  
  // Pausenzeit berechnen (auch über Mitternacht)
  let breakMinutes =
    (endBreakH * 60 + endBreakM) - (startBreakH * 60 + startBreakM);
  
  if (breakMinutes < 0) {
    breakMinutes += 24 * 60; // Falls die Pause über Mitternacht geht
  }
  
  // Falls die Pausenzeit ungültig ist, setze sie auf 0
  if (isNaN(breakMinutes)) {
    breakMinutes = 0;
  }
  
  // Effektive Arbeitszeit berechnen
  let workMinutes = totalMinutes - breakMinutes;
  
  // Falls die Arbeitszeit trotzdem negativ ist (z. B. durch falsche Eingaben), Fehlermeldung ausgeben
  if (workMinutes < 0) return alert("Ungültige Arbeitszeit! Bitte überprüfen.");
  

  const result = `${Math.floor(workMinutes / 60) < 10 ? `0${Math.floor(workMinutes / 60)}` : Math.floor(workMinutes / 60)}S ${
   workMinutes % 60 >= 10 ? workMinutes % 60 : `0${workMinutes % 60}`
  }M`;

  const newResultStart = parseFloat(result.split(" ")[0]);
  const newResultEnd = parseFloat(result.split(" ")[1]);

  let oldResultStart = 0;
  let oldResultEnd = 0;
  if(oldTime){
    oldResultStart = parseFloat(oldTime.split(" ")[0]);
    oldResultEnd = parseFloat(oldTime.split(" ")[1]);
  }
  
  let resultObject = {
    first: newResultStart - oldResultStart,
    end: newResultEnd - oldResultEnd 
  };
  // Aktualisieren des Zustands mit der neuen Arbeitszeit
  time.month.find((date) => date.date === item.date)[name] = result;

  console.log(resultObject);

  if(isNaN(resultObject.first) || isNaN(resultObject.end)){
    return console.log(`Ergebnis is ungültig`);
    
  }
  

  const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/timelog`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          newLog: time,
          result: resultObject
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