import { useContext, useState } from "react";
import { Time, User } from "../../../../context/Context";
import { EditProfileDialog } from "../../../../dialog/Dialog";
import "./tableHead.css";

const TableHead = ({ showWindow, setShowWindow }) => {
  const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User);

  return (
    <div className="table-head">
      {showWindow === "profile" ? (
        <EditProfileDialog
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setTime={setTime}
          setUser={setUser}
          user={user}
        />
      ) : (
        ""
      )}

      <h1>Arbeitszeiten</h1>
      <div>
        <p>Name: {user.name}</p>
        <p>Firma: {user.company}</p>
      </div>

      <div className="entire-days">
        <p>Feiertage: {user.holiday}</p>
        <p>Urlaubstage: {user.dayOff}</p>
        <p>Krankheitstage: {user.sickDay}</p>
        <p>Stunden Vormonat: {time.hoursFromLastMonth}</p>
      </div>

      <p>
        <span style={{ color: "red" }}>K</span> = Krankheitstag{" "}
        <span style={{ color: "blue" }}>F</span> = Feiertag{" "}
        <span style={{ color: "green" }}>U</span> = Urlaubstag
      </p>
    </div>
  );
};
export default TableHead;
