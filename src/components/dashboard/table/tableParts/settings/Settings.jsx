import { useContext } from "react";
import { deleteTimelog } from "../../deleteTimelog";
import { getData } from "../../getData";
import { getDaysInMonth } from "../../getDaysInMonth";
import { logout } from "../../logout";
import { Time, User } from "../../../../context/Context";
import { useNavigate } from "react-router-dom";

const Settings = ({setChooseMonth, chooseMonth, edit, setEdit}) => {
    const navigate = useNavigate();
    const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User); 
  
  async function getFormData(e){
    e.preventDefault()
 }
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

      {!edit ? (
        <button onClick={() => setEdit(true)}>Bearbeiten</button>
      ) : (
        <button onClick={() => setEdit(false)}>Bearbeitung beenden</button>
      )}  
      </div>

      <form action="" onSubmit={(e) => getFormData(e)} >
                <legend>Name:</legend>
                <input type="text" name="name"/>

                <legend>Firma:</legend>
                <input type="text" name="company"/>
                
      </form>
    </>)
}

export default Settings;