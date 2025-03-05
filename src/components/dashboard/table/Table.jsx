import { useEffect, useState } from "react";
import "./table.css";
import { getDaysInMonth } from "./getDaysInMonth";
import Dialog from "../../dialog/Dialog";
import { calculateTime } from "./calculateTime";
import { logout } from "./logout";
import { useNavigate } from "react-router-dom";
import { deleteTimelog } from "./deleteTimelog";

const URL = import.meta.env.VITE_BACKENDURL;

const Table = () => {
  const days = ["samstag", "sonntag"];
  const [time, setTime] = useState([]);
  const [disableInputs, setDisableInputs] = useState(false);
  const [chooseMonth, setChooseMonth] = useState({
    month: "",
    year: "",
  });
  const navigate = useNavigate();

  function handleCheckboxChange(e, date) {
    const { name, checked } = e.target;
    console.log(e.target);
    
  }

  function changeValue(e, date) {
    const { name, value } = e.target;

    setTime((prevTime) =>
      prevTime.map((item) =>
        item.date === date ? { ...item, [name]: value.trim() } : item
      )
    );
  }

  return (
    <>
      <Dialog />
      <input
        type="month"
        onChange={(e) => {
          const [year, month] = e.target.value.split("-").map(Number);
          setChooseMonth({ month, year });
        }}
      />
      <div>
        <button
          disabled={!chooseMonth.month || !chooseMonth.year}
          onClick={() =>
            getDaysInMonth(setTime, chooseMonth.month, chooseMonth.year)
          }
        >
          Neues Formular
        </button>
        <button onClick={() => deleteTimelog()}>Alles leeren</button>
        <button>Drucken</button>
        <button onClick={() => logout(navigate)}>Logout</button>
      </div>

      <div className="sheet">
        <h1>Arbeitszeiten</h1>
          <p>Name: </p>
          <p>Stunden Vormonat: </p>
        <table className="table">
          <thead style={{ display: "flex" }}>
            <tr>
              <th>Datum</th>
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
          {!time && !time.month
            ? ""
            : time.month?.map((item, key) => (
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
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        minLength={5}
                        maxLength={5}
                        name="endWork"
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
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
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        minLength={5}
                        maxLength={5}
                        name="endBreak"
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={(e) => calculateTime(e, item, time, setTime)}
                        name="totalTime"
                        disabled={
                          item.day === days[0] ||
                          item.day === days[1] ||
                          item.disable
                        }
                      >
                        Berechnen
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>{!item.totalTime ? "00S 00M" : item.totalTime}</td>
                  </tr>
                  <tr>
                    <td style={{ display: "flex" }}>
                      <legend>Feiertag</legend>
                      <input
                        type="checkbox"
                        name="freeDay"
                        onChange={(e) => handleCheckboxChange(e, item.date)}
                        checked={item.disable}
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                      <legend>Krankentag</legend>
                      <input
                        type="checkbox"
                        name="sickday"
                        onChange={(e) => handleCheckboxChange(e, item.date)}
                        checked={item.disable}
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                      <legend>Urlaubstag</legend>
                      <input
                        type="checkbox"
                        name="holiday"
                        onChange={(e) => handleCheckboxChange(e, item.date)}
                        checked={item.disable}
                        disabled={
                          disableInputs ||
                          item.disable ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
        </table>
        <div>
        <p>Soll AZ: </p>
        <p>Ist AZ: </p>  
        </div>
        
        <div>
        <p>Plus/Minus: </p>  
        </div>
        
      </div>
    </>
  );
};

export default Table;
