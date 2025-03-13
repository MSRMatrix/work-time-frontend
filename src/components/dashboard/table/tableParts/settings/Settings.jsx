import { useContext } from "react";
import { deleteTimelog } from "../../deleteTimelog";
import { getData } from "../../getData";
import { getDaysInMonth } from "../../getDaysInMonth";
import { logout } from "../../logout";
import { Time, User } from "../../../../context/Context";
import { useNavigate } from "react-router-dom";
import { colorHandler } from "./colorHandler/ColorHandler";

const Settings = ({setChooseMonth, chooseMonth, setShowWindow, showWindow}) => {
    const navigate = useNavigate();
    const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User); 
  console.log(showWindow);


    return(<>
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
            getDaysInMonth(setTime, chooseMonth.month, chooseMonth.year)
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
        <button>Drucken</button>
        <button onClick={() => logout(navigate)}>Logout</button>
      </div>


      <button onClick={() => setShowWindow("profile")}>Profil bearbeiten</button>
      <button onClick={() => setShowWindow("time")}>Zeit anpassen</button>

          <form action="" onSubmit={(e) => colorHandler(e, setTime, setUser)}>
          <fieldset>
          <legend>Farbeinstellungen</legend>  
        <legend>Hintergrundfarbe:</legend>
        <input onChange={(e) => console.log(e.target.value)} type="color" name="backgroundColor"/>

        <legend>Schriftfarbe:</legend>
        <input onChange={(e) => console.log(e.target.value)} type="color" name="fontColor"/>

        <button type="submit">Ändern</button>
      </fieldset>  
          </form>
      

      </div>
    </>)
}

export default Settings;