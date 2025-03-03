import { useEffect, useState } from "react";
import "./table.css";
import { getDaysInMonth } from "./getDaysInMonth";
import Dialog from "../../dialog/Dialog";

const URL = import.meta.env.VITE_BACKENDURL;

const Table = () => {
  const days = ["samstag", "sonntag"];
  const [time, setTime] = useState([]);
  const [disableInputs, setDisableInputs] = useState(false);
  const [disable, setDisable] = useState({
    freeDay: false,
    sickday: false,
    holiday: false,
  });

  useEffect(() => {
    getDaysInMonth(setTime);
  }, []);

  function handleCheckboxChange(e, date) {
    const { name, checked } = e.target;

    console.log("Datum:", date);

    const foundItem = time.find((item) => item.date === date);

    if (!foundItem) {
      return;
    }

    setTime((prevTime) =>
      prevTime.map((item) =>
        item.date === date
          ? {
              ...item,
              disable: {
                freeDay: name === "freeDay" ? checked : item.disable.freeDay,
                sickday: name === "sickday" ? checked : item.disable.sickday,
                holiday: name === "holiday" ? checked : item.disable.holiday,
              },
            }
          : item
      )
    );
  }

  function changeValue(e, date) {
    const { name, value } = e.target;

    setTime((prevTime) =>
      prevTime.map((item) =>
        item.date === date ? { ...item, [name]: value.trim() } : item
      )
    );
  }

  console.log(time);

  function totalHours(e, item) {
    const { name } = e.target;
  
    // Suchen des entsprechenden Datums im Zeitprotokoll
    const timeLog = time.find((hours) => hours.date === item.date);  // Verwende 'find' statt 'filter'
  
    // Wenn das Zeitprotokoll nicht gefunden wurde, breche die Funktion ab
    if (!timeLog) {
      return;
    }
  
    // Aufteilen der Zeitangaben in Stunden und Minuten
    const [startH, startM] = item.startWork.split(":").map(Number);
    const [endH, endM] = item.endWork.split(":").map(Number);
  
    const [startBreakH, startBreakM] = item.startBreak.split(":").map(Number);
    const [endBreakH, endBreakM] = item.endBreak.split(":").map(Number);
  
    // Berechnung der gesamten Arbeitszeit in Minuten
    let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  
    // Berechnung der Pausenzeit in Minuten
    let breakMinutes = (endBreakH * 60 + endBreakM) - (startBreakH * 60 + startBreakM);
  
    if (isNaN(breakMinutes)) {
      breakMinutes = 0; // Falls keine Pausenzeit angegeben, setze sie auf 0
    }
  
    // Berechnung der tatsächlichen Arbeitszeit (abzüglich der Pausen)
    let workMinutes = totalMinutes - breakMinutes;
  
    // Falls die Arbeitszeit negativ ist, gib eine Warnung aus
    if (workMinutes < 0) return alert("Arbeitszeit kann nicht negativ sein!");
  
    // Formatieren des Ergebnisses
    const result = `${Math.floor(workMinutes / 60)} Stunden ${workMinutes % 60} Minuten`;
  
    // Aktualisieren des Zustands mit der neuen Arbeitszeit
    setTime((prevTime) =>
      prevTime.map((hours) =>
        hours.date === item.date ? { ...hours, [name]: result } : hours  // Achte darauf, dass das richtige 'hours' Objekt aktualisiert wird
      )
    );
  }
  

  return (
    <>
      <Dialog />
      <div>
        <button>Neues Formular</button>
        <button>Alles leeren</button>
        <button>Drucken</button>
      </div>

      <div className="sheet">
        <h1>Arbeitszeiten</h1>

        <table className="table">
          <thead style={{ display: "flex" }}>
            <tr>
              <th>Tag</th>
            </tr>
            <tr>
              <th>Arbeitszeiten</th>
            </tr>
            <tr>
              <th>Unterbrechung / Pause</th>
            </tr>
            <tr>
              <th>Stunden</th>
            </tr>
            <tr>
              <th>Andere</th>
            </tr>
          </thead>
          {!time
            ? ""
            : time.map((item, key) => (
                <tbody
                  key={key}
                  style={{
                    background:
                      item.day === days[0] || item.day === days[1]
                        ? "gray"
                        : "",
                  }}
                >
                  <tr>
                    <td>{item.date}</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        minLength={"5"}
                        maxLength={5}
                        name="startWork"
                        disabled={disableInputs || item.disable.freeDay || item.disable.sickday || item.disable.holiday || item.day === days[0] || item.day === days[1]}
                      />
                    </td>
                    <td>
                      <input
                      onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        minLength={5}
                        maxLength={5}
                        name="endWork"
                        disabled={disableInputs || item.disable.freeDay || item.disable.sickday || item.disable.holiday || item.day === days[0] || item.day === days[1]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                      onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        minLength={5}
                        maxLength={5}
                        name="startBreak"
                        disabled={disableInputs || item.disable.freeDay || item.disable.sickday || item.disable.holiday || item.day === days[0] || item.day === days[1]}
                      />
                    </td>
                    <td>
                      <input
                      onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        minLength={5}
                        maxLength={5}
                        name="endBreak"
                        disabled={disableInputs || item.disable.freeDay || item.disable.sickday || item.disable.holiday || item.day === days[0] || item.day === days[1]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                      onClick={(e) => totalHours(e, item)}
                      name="totalTime"
                        disabled={item.day === days[0] || item.day === days[1]|| item.disable.sickday || item.disable.holiday ||item.disable.freeDay}
                      >
                        Berechnen
                      </button> 
                    </td>
                  </tr>
                  <tr>
                    <td>
                    {!item.totalTime ? 0 : item.totalTime}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ display: "flex" }}>
                      <legend>Feiertag</legend>
                      <input
                        type="checkbox"
                        name="freeDay"
                        onChange={(e) => handleCheckboxChange(e, item.date)}
                        checked={item.disable.freeDay}
                        disabled={disableInputs || item.disable.sickday || item.disable.holiday || item.day === days[0] || item.day === days[1]}
                      />
                      <legend>Krankentag</legend>
                      <input
                        type="checkbox"
                        name="sickday"
                        onChange={(e) => handleCheckboxChange(e, item.date)}
                        checked={item.disable.sickday}
                        disabled={disableInputs || item.disable.freeDay || item.disable.holiday || item.day === days[0] || item.day === days[1]}
                      />
                      <legend>Urlaubstag</legend>
                      <input
                        type="checkbox"
                        name="holiday"
                        onChange={(e) => handleCheckboxChange(e, item.date)}
                        checked={item.disable.holiday}
                        disabled={disableInputs || item.disable.freeDay || item.disable.sickday || item.day === days[0] || item.day === days[1]}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
        </table>
      </div>
    </>
  );
};

export default Table;
