import { useState } from "react";

const Table = () => {
  const [disableInputs, setDisableInputs] = useState(false);
  const [disable, setDisable] = useState({
    freeDay: false,
    sickday: false,
    holiday: false,
  });
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;

    if (checked) {
      setDisableInputs(true);
      setDisable({
        freeDay: name === "freeDay",
        sickday: name === "sickday",
        holiday: name === "holiday",
      });
    } else {
      setDisableInputs(false);
      setDisable({ freeDay: false, sickday: false, holiday: false });
    }
  }

  function calculateTime(start, end, startBreak, endBreak) {
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

  function timeFunction(e) {
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
  }

  console.log(time);

  return (
    <>
      <form onSubmit={timeFunction}>
        <fieldset>
          <legend>Arbeitszeiten</legend>
          <legend>Arbeitsbeginn</legend>
          <input type="time" name="start" disabled={disableInputs} required={!disableInputs}/>

          <legend>Feierabend</legend>
          <input type="time" name="end" disabled={disableInputs} required={!disableInputs} />

          <legend>Pausenbeginn</legend>
          <input type="time" name="start-break" disabled={disableInputs} />

          <legend>Pausenende</legend>
          <input type="time" name="end-break" disabled={disableInputs} />

          <legend>Feiertag</legend>
          <input
            type="checkbox"
            name="freeDay"
            onChange={handleCheckboxChange}
            checked={disable.freeDay}
            disabled={disableInputs && !disable.freeDay}
          />

          <legend>Krankentag</legend>
          <input
            type="checkbox"
            name="sickday"
            onChange={handleCheckboxChange}
            checked={disable.sickday}
            disabled={disableInputs && !disable.sickday}
          />

          <legend>Urlaubstag</legend>
          <input
            type="checkbox"
            name="holiday"
            onChange={handleCheckboxChange}
            checked={disable.holiday}
            disabled={disableInputs && !disable.holiday}
          />

          <button type="submit">Einfügen</button>
        </fieldset>
      </form>

      <table>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Stunden</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Arbeitszeit</td>
            <td>
              {time.hours}h {time.minutes}min
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
