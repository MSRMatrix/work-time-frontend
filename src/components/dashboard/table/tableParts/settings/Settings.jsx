import { useContext } from "react";
import { deleteTimelog } from "../../../../functions/deleteTimelog"; 
import { getData } from "../../../../functions/getData"; 
import { getDaysInMonth } from "../../../../functions/getDaysInMonth"; 
import { logout } from "../../../../functions/logout"; 
import { Time, User } from "../../../../context/Context";
import { useNavigate } from "react-router-dom";
import { colorHandler } from "./colorHandler/colorHandler";


const Settings = ({
  setChooseMonth,
  chooseMonth,
  setShowWindow,
  showWindow,
  days,
  setDays
}) => {
  const navigate = useNavigate();
  const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User);

  function weekendFunction(e, days) {
  //  weekend fetch
  }
  


  return (
    <>
      <div className="settings">
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
              getDaysInMonth(setTime, chooseMonth.month, chooseMonth.year, setUser)
            }
          >
            Neues Formular
          </button>
          <button
            onClick={() => {
              deleteTimelog(), getData(setTime, setUser);
            }}
          >
            Alles leeren
          </button>
          {/* <button onClick={() => navigate("/")}>Drucken</button> */}
          <button onClick={() => logout(navigate)}>Logout</button>
        </div>

        <button onClick={() => setShowWindow("profile")}>
          Profil bearbeiten
        </button>
        <button onClick={() => setShowWindow("time")}>Zeit anpassen</button>

          <fieldset>
            <legend>Wochenende</legend>
            <legend>Samstag</legend>
            <input type="checkbox" defaultChecked={user.weekend.includes("samstag")} name="samstag" id="" onClick={(e) => weekendFunction(e, days)}/>
            <legend>Sonntag</legend>
            <input type="checkbox" defaultChecked={user.weekend.includes("sonntag")} name="sonntag" id="" onClick={(e) => weekendFunction(e, days)}/>
          </fieldset>
 
        <form action="" onSubmit={(e) => colorHandler(e, setTime, setUser)}>
        <fieldset>
  <legend>Farbeinstellungen</legend>

  <legend>Hintergrundfarbe:</legend>
  <input
    type="color"
    name="backgroundColor"
    value={time  ? time.backgroundColor : "#2214db"}
    onChange={(e) => setTime({ ...time, backgroundColor: e.target.value })}
  />

  <legend>Schriftfarbe:</legend>
  <input
    type="color"
    name="fontColor"
    value={time ? time.fontColor : "#ffffff"}
    onChange={(e) => setTime({ ...time, fontColor: e.target.value })}
  />

  <button type="submit">Ändern</button>
</fieldset>

        </form>
      </div>
    </>
  );
};

export default Settings;
