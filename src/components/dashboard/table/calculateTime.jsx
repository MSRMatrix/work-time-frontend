export function calculateTime(start, end, startBreak, endBreak) {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    const [startBreakH, startBreakM] = startBreak.split(":").map(Number);
    const [endBreakH, endBreakM] = endBreak.split(":").map(Number);

    let totalMinutes = endH * 60 + endM - (startH * 60 + startM);
    let breakMinutes =
      endBreakH * 60 + endBreakM - (startBreakH * 60 + startBreakM);
    if (isNaN(breakMinutes)) {
      breakMinutes = 0;
    }

    let workMinutes = totalMinutes - breakMinutes;

    if (workMinutes < 0) return alert("Arbeitszeit kann nicht negativ sein!");

    return {
      hours: Math.floor(workMinutes / 60),
      minutes: workMinutes % 60,
    };
  }