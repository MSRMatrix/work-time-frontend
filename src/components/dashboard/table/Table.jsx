import { useEffect, useState } from "react";
import "./table.css";
import { getDaysInMonth } from "./getDaysInMonth";
import { timeFunction } from "./timeFunction";

const Table = () => {
  const days = ["samstag", "sonntag"]
  const [disableInputs, setDisableInputs] = useState(false);
  const [disable, setDisable] = useState({
    freeDay: false,
    sickday: false,
    holiday: false,
  });
  const [time, setTime] = useState(null);
  const [tableData, setTableData] = useState([]);

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

  useEffect(() => {
    getDaysInMonth(setTime);
  }, []);

  console.log(time);

  return (
    <>
      <form
        onSubmit={(e) => timeFunction(e, setTime, setTableData, tableData)}
      ></form>
      <div>
        <button>Neues Forumal</button>
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
              <th>Haus- und Klientenbesuche</th>
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
                <tbody key={key} style={{background: item.day === days[0] || item.day === days[1] ? "gray" : ""}}>
                  <tr>
                    <td>{item.date}</td>
                  </tr>
                  <tr>
                    <td>
                      {!item.workTime ? (
                        <input
                          type="text"
                          name="start"
                          disabled={disableInputs ||item.day === days[0] || item.day === days[1] }
                          required={!disableInputs}
                        />
                      ) : (
                        item.workTime
                      )}
                    </td>
                    <td>
                      {!item.workTime ? (
                        <input
                          type="text"
                          name="end"
                          disabled={disableInputs ||item.day === days[0] || item.day === days[1] }
                          required={!disableInputs}
                        />
                      ) : (
                        item.workTime
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {!item.clients ? (
                        <input
                          type="text"
                          name="start-clients"
                          disabled={disableInputs ||item.day === days[0] || item.day === days[1] }
                        />
                      ) : (
                        item.clients
                      )}
                    </td>
                    <td>
                      {!item.clients ? (
                        <input
                          type="text"
                          name="end-clients"
                          disabled={disableInputs ||item.day === days[0] || item.day === days[1] }
                        />
                      ) : (
                        item.clients
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {!item.breakTime ? (
                        <input
                          type="text"
                          name="start-break"
                          disabled={disableInputs ||item.day === days[0] || item.day === days[1] }
                        />
                      ) : (
                        item.breakTime
                      )}
                    </td>
                    <td>
                      {!item.breakTime ? (
                        <input
                          type="text"
                          name="end-break"
                          disabled={disableInputs ||item.day === days[0] || item.day === days[1] }
                        />
                      ) : (
                        item.breakTime
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {!item.totalTime ? (
                        <button disabled={item.day === days[0] || item.day === days[1] }>Berechnen</button>
                      ) : (
                        `${item.totalTime} Stunden`
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ display: "flex" }}>
                      <legend>Feiertag</legend>
                      <input
                        type="checkbox"
                        name="freeDay"
                        onChange={handleCheckboxChange}
                        checked={disable.freeDay}
                        disabled={disableInputs && !disable.freeDay || item.day === days[0] || item.day === days[1] }
                      />

                      <legend>Krankentag</legend>
                      <input
                        type="checkbox"
                        name="sickday"
                        onChange={handleCheckboxChange}
                        checked={disable.sickday}
                        disabled={disableInputs && !disable.sickday || item.day === days[0] || item.day === days[1] }
                      />

                      <legend>Urlaubstag</legend>
                      <input
                        type="checkbox"
                        name="holiday"
                        onChange={handleCheckboxChange}
                        checked={disable.holiday}
                        disabled={disableInputs && !disable.holiday || item.day === days[0] || item.day === days[1] }
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
