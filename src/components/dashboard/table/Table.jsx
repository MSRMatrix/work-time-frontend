import { useContext, useEffect, useState } from "react";
import "./table.css";
import { getDaysInMonth } from "./getDaysInMonth";
import Dialog from "../../dialog/Dialog";
import { calculateTime } from "./calculateTime";
import { logout } from "./logout";
import { useNavigate } from "react-router-dom";
import { deleteTimelog } from "./deleteTimelog";
import { Time, User } from "../../context/Context";
import { handleCheckboxChange } from "./handleCheckboxChange";
import { editDays } from "./editDays";
import { getData } from "./getData";

const URL = import.meta.env.VITE_BACKENDURL;

const Table = () => {
  const days = ["samstag", "sonntag"];
  const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User);
  const [disableInputs, setDisableInputs] = useState(false);
  const [chooseMonth, setChooseMonth] = useState({
    month: "",
    year: "",
  });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  function changeValue(e, date) {
    const { name, value } = e.target;
    time.month.find((item) => item.date === date)[name] = value;
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
        <button onClick={() => {deleteTimelog(), getData(setTime, setUser)}}>Alles leeren</button>
        <button>Drucken</button>
        <button onClick={() => logout(navigate)}>Logout</button>
      </div>

      {!edit ? (
        <button onClick={() => setEdit(true)}>Bearbeiten</button>
      ) : (
        <button onClick={() => setEdit(false)}>Bearbeitung beenden</button>
      )}
      <div className="sheet">
        <h1>Arbeitszeiten</h1>
        {edit ? (
          <form action="" onSubmit={(e) => editDays(e, setTime, setUser, setEdit)}>
            <input defaultValue={user.holiday} type="number" name="holiday" />
            <input defaultValue={user.dayOff} type="number" name="dayOff" />
            <input defaultValue={user.sickDay} type="number" name="sickDay" />
            <input
              defaultValue={user.totalHours}
              type="number"
              name="totalHours"
            />
            <button type="submit">Ändern</button>
          </form>
        ) : (
          <div>
            <p>Feiertage: {user.holiday}</p>
            <p>Urlaubstage: {user.dayOff}</p>
            <p>Krankheitstage: {user.sickDay}</p>
            <p>Stunden Insgesamt: {user.totalHours || "00S 00M"}</p>
          </div>
        )}
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
          {time && time?.month
            ?  time.month?.map((item, key) => (
                <tbody
                  key={key}
                  style={{
                    background:
                      item.day === days[0] ||
                      item.day === days[1] ||
                      item.dayOff ||
                      item.sickDay ||
                      item.holiday
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
                        defaultValue={item.startWork}
                        minLength={"5"}
                        maxLength={5}
                        name="startWork"
                        disabled={
                          disableInputs ||
                          item.dayOff ||
                          item.sickDay ||
                          item.holiday ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        defaultValue={item.endWork}
                        minLength={5}
                        maxLength={5}
                        name="endWork"
                        disabled={
                          disableInputs ||
                          item.dayOff ||
                          item.sickDay ||
                          item.holiday ||
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
                        defaultValue={item.startBreak}
                        minLength={5}
                        maxLength={5}
                        name="startBreak"
                        disabled={
                          disableInputs ||
                          item.dayOff ||
                          item.sickDay ||
                          item.holiday ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                    <td>
                      <input
                        onChange={(e) => changeValue(e, item.date)}
                        type="text"
                        defaultValue={item.endBreak}
                        minLength={5}
                        maxLength={5}
                        name="endBreak"
                        disabled={
                          disableInputs ||
                          item.dayOff ||
                          item.sickDay ||
                          item.holiday ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={(e) => calculateTime(e, item, time, setTime, setUser)}
                        name="totalTime"
                        disabled={
                          item.day === days[0] ||
                          item.day === days[1] ||
                          item.dayOff ||
                          item.sickDay ||
                          item.holiday
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
                        name="dayOff"
                        onChange={(e) =>
                          handleCheckboxChange(e, item.date, setTime, setUser)
                        }
                        checked={item.dayOff}
                        disabled={
                          disableInputs ||
                          item.holiday ||
                          item.sickDay ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                      <legend>Krankentag</legend>
                      <input
                        type="checkbox"
                        name="sickDay"
                        onChange={(e) =>
                          handleCheckboxChange(e, item.date, setTime, setUser)
                        }
                        checked={item.sickDay}
                        disabled={
                          disableInputs ||
                          item.dayOff ||
                          item.holiday ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                      <legend>Urlaubstag</legend>
                      <input
                        type="checkbox"
                        name="holiday"
                        onChange={(e) =>
                          handleCheckboxChange(e, item.date, setTime, setUser)
                        }
                        checked={item.holiday}
                        disabled={
                          disableInputs ||
                          item.dayOff ||
                          item.sickDay ||
                          item.day === days[0] ||
                          item.day === days[1]
                        }
                      />
                    </td>
                  </tr>
                </tbody>
            
             )): ""}
        </table>
        <div>
          <p>Soll AZ: {time ? time.targetValue : ""}</p>
          <p>Ist AZ: {time ? time.actualTime : ""}</p>
        </div>
        <div>
          <p>Plus/Minus: 00S 00M
            {/* {time ? time.actualTime - time.targetValue : ""} */}

          </p>
        </div>
      </div>
    </>
  );
};

export default Table;
