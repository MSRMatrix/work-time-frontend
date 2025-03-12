import { useContext } from "react";
import { Time, User } from "../../../../context/Context";
import { editDays } from "../../editDays";
import "./tableHead.css"

const TableHead = ({ edit, setEdit }) => {
  const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User);

  return (
    <div className="table-head">
      <h1>Arbeitszeiten</h1>
      <div>
      <p>Name: </p>
      <p>Firma: </p>  
      </div>
      {edit ? (
        <form
          action=""
          onSubmit={(e) => editDays(e, setTime, setUser, setEdit)}
        >
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
        <div className="entire-days">
          <p>Feiertage: {user.holiday}</p>
          <p>Urlaubstage: {user.dayOff}</p>
          <p>Krankheitstage: {user.sickDay}</p>
          <p>Stunden Vormonat: {user.totalHours || "00S 00M"}</p>
        </div>
      )}
      K = Krankheitstag {/* Rot */}
      F = Feiertag {/* Grün */}
      U = Urlaubgstag {/* Blau */}
    </div>
  );
};
export default TableHead;
