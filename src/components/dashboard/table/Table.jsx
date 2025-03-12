import { useContext, useEffect, useState } from "react";
import "./table.css";
import Dialog from "../../dialog/Dialog";
import { Time } from "../../context/Context";
import TableBody from "./tableParts/tableBody/TableBody";
import TableFooter from "./tableParts/tableFooter/TableFooter";
import TableHead from "./tableParts/tableHead/TableHead";
import Settings from "./tableParts/settings/Settings";

// const URL = import.meta.env.VITE_BACKENDURL;

const Table = () => {
  const days = ["samstag", "sonntag"];
  const { time, setTime } = useContext(Time);
  const [disableInputs, setDisableInputs] = useState(false);
  const [chooseMonth, setChooseMonth] = useState({
    month: "",
    year: "",
  });
  const [edit, setEdit] = useState(false);
  const [showWindow, setSowWindow] = useState(false)

  function changeValue(e, date) {
    const { name, value } = e.target;
    time.month.find((item) => item.date === date)[name] = value;
  }
  return (
    <>
     { showWindow ? <Dialog /> : ""}
     <Settings 
     setChooseMonth={setChooseMonth}  
     chooseMonth={chooseMonth}  
     edit={edit}  
     setEdit={setEdit} />
      
      <div className="sheet">
        <TableHead edit={edit} setEdit={setEdit} />
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
