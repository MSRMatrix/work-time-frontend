import { calculateTime } from "./calculateTime";

export function timeFunction(e, setTime, setTableData, tableData) {
    e.preventDefault();
    const sickday = e.target.elements.sickday.checked;
    const holiday = e.target.elements.holiday.checked;
    const freeDay = e.target.elements.freeDay.checked;

    if (freeDay || sickday || holiday) {
      return console.log("No time");
    }

    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const {
      start,
      end,
      "start-break": startBreak,
      "end-break": endBreak,
    } = formDataObject;

    if (end <= start)
      return alert("Arbeitsbeginn muss vor dem Feierabend sein!");
    if (endBreak < startBreak)
      return alert("Pausenbeginn muss vor dem Pausenende sein!");

    const newTime = calculateTime(start, end, startBreak, endBreak);
    setTime(newTime);

    // Dynamisch eine neue Zeile in die Tabelle einfügen
    setTableData([
      ...tableData,
      {
        day: new Date().toLocaleDateString(),
        start,
        end,
        breakStart: startBreak,
        breakEnd: endBreak,
        workedHours: `${newTime.hours}h ${newTime.minutes}min`,
      },
    ]);
  }