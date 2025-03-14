import { getData } from "./getData";

export async function calculateTime(e, item, time, setTime, setUser) {
  const { name } = e.target;

  // const timeLog = time.find((hours) => hours.date === item.date); 

  // if (!timeLog) {
  //   return;
  // }
  let oldTime;
  if(item.totalTime){
    oldTime = item.totalTime
  }
  

  const [startH, startM] = item.startWork.split(":").map(Number);
  const [endH, endM] = item.endWork.split(":").map(Number);

  const [startBreakH, startBreakM] = item.startBreak.split(":").map(Number);
  const [endBreakH, endBreakM] = item.endBreak.split(":").map(Number);

  let totalMinutes = endH * 60 + endM - (startH * 60 + startM);

  let breakMinutes =
    endBreakH * 60 + endBreakM - (startBreakH * 60 + startBreakM);

  if (isNaN(breakMinutes)) {
    breakMinutes = 0;
  }

  let workMinutes = totalMinutes - breakMinutes;

  if (workMinutes < 0) return alert("Arbeitszeit kann nicht negativ sein!");

  const result = `${Math.floor(workMinutes / 60) <= 10 ? `0${Math.floor(workMinutes / 60)}` : Math.floor(workMinutes / 60)}S ${
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

  console.log(resultObject);
  

  // Aktualisieren des Zustands mit der neuen Arbeitszeit
  time.month.find((date) => date.date === item.date)[name] = result;

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