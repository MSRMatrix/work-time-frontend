import { sendMonthDataToServer } from "./sendMonthDataToServer";

export function getDaysInMonth(setTime, month, year) {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const date = new Date(year, month - 1, day);
    const formattedDay = day.toString().padStart(2, "0"); 
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedYear = year.toString().padStart(2, "0")
    
    const weekday = date.toLocaleDateString("de-DE", { weekday: "long" });

    daysArray.push({
      date: `${formattedDay}.${formattedMonth}.${formattedYear}`,
      startWork: "",
      endWork: "",
      startBreak: "",
      endBreak: "",
      totalTime: "",
      day: weekday.toLowerCase(),
      disable: {
        freeDay: false,
        sickday: false,
        holiday: false,
      },
    });
  }
  setTime(daysArray);
  // sendMonthDataToServer(month, year, daysArray, setTime)
  sendMonthDataToServer(month, year, daysArray)
}
