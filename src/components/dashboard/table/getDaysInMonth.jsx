export function getDaysInMonth(setTime) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Monat im Bereich 0-11 (Januar ist 0)
  
  
  
  // Den letzten Tag des aktuellen Monats ermitteln
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDayOfMonth.getDate(); // Anzahl der Tage im aktuellen Monat

  

  const daysArray = [];
  
  // Den Monat im Format MM erstellen (z.B. 01 für Januar, 02 für Februar, etc.)
  const formattedMonth = (currentMonth + 1).toString().padStart(2, "0");
  
  for (let day = 1; day <= totalDays; day++) {
    const formattedDay = day.toString().padStart(2, "0"); // Formatieren des Tages (z.B. 01, 02, ...)
    const date = new Date(currentYear, currentMonth, day);
const weekday = date.toLocaleDateString("de-DE", { weekday: "long" });

     daysArray.push([{
      date: `${formattedDay}.${formattedMonth}`,  
      workTime: "",                               
      clients: "",                                
      breakTime: "",                              
      totalTime: "",
      day: weekday.toLowerCase()                            
    }]);
  }
  
  setTime(daysArray.flat());
}
