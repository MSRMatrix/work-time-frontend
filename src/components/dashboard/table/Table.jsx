import { useContext, useEffect, useState } from "react";
import "./table.css";
import { Time } from "../../context/Context";
import TableBody from "./tableParts/tableBody/TableBody";
import TableFooter from "./tableParts/tableFooter/TableFooter";
import TableHead from "./tableParts/tableHead/TableHead";
import Settings from "./tableParts/settings/Settings";

// const URL = import.meta.env.VITE_BACKENDURL;

const Table = () => {
  const [showWindow, setShowWindow] = useState("");
  const days = ["samstag", "sonntag"];
  const { time, setTime } = useContext(Time);
  const [disableInputs, setDisableInputs] = useState(false);
  const [chooseMonth, setChooseMonth] = useState({
    month: "",
    year: "",
  });

  function changeValue(e, date) {
    let { name, value } = e.target;

    // Entferne alle Zeichen außer Zahlen und ":"
    value = value.replace(/[^0-9:]/g, "");

    // Wenn mehr als 2 Zeichen und kein ":" enthalten sind, füge ":" hinzu
    if (value.length > 2 && !value.includes(":")) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4);
    }

    // Finde das richtige Element in `time.month` und setze den Wert
    const updatedTime = time.month.map((item) =>
      item.date === date ? { ...item, [name]: value } : item
    );

    // Aktualisiere den Zustand, um die Änderung zu speichern (muss `setTime` verwendet werden)
    setTime((prevState) => ({
      ...prevState,
      month: updatedTime,
    }));
  }

  return (
    <>
      <Settings
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        setChooseMonth={setChooseMonth}
        chooseMonth={chooseMonth}
      />

      <div
        className="sheet"
        style={{
          background: time && time.backgroundColor ? time.backgroundColor : "",
          color: time && time.fontColor ? time.fontColor : "",
        }}
      >
        <TableHead showWindow={showWindow} setShowWindow={setShowWindow} />
        <table className="table">
          <thead>
            <tr>
              <th>Datum</th>
            </tr>
            <tr>
              <th>Arbeitszeiten</th>
            </tr>
            <tr>
              <th>Pause</th>
            </tr>
            <tr>
              <th>Stunden</th>
            </tr>
            <tr>
              <th>Andere</th>
            </tr>
          </thead>
          <TableBody
            days={days}
            changeValue={changeValue}
            disableInputs={disableInputs}
          />
        </table>
        <TableFooter />
      </div>
    </>
  );
};

export default Table;
