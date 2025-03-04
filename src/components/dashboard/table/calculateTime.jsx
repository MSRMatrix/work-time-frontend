export function calculateTime(e, item, time, setTime) {
  const { name } = e.target;

  const timeLog = time.find((hours) => hours.date === item.date); 

  if (!timeLog) {
    return;
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

  // Aktualisieren des Zustands mit der neuen Arbeitszeit
  setTime((prevTime) =>
    prevTime.map(
      (hours) =>
        hours.date === item.date ? { ...hours, [name]: result } : hours
    )
  );
  }