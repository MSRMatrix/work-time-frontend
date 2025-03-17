import { editProfile } from "../functions/editProfile";
import { editTargetValue } from "../functions/editTargetValue";

export const EditProfileDialog = ({
  setShowWindow,
  setTime,
  setUser,
  user,
}) => {
  return (
    <dialog open>
      <h2>Profil bearbeiten</h2>
      <form
        onSubmit={(e) => {
          editProfile(e, setTime, setUser);
          setShowWindow("");
        }}
      >
        <fieldset>
          <fieldset>
            <legend>Name</legend>
            <input defaultValue={user.name} type="text" name="name" />
          </fieldset>

          <fieldset>
            <legend>Firma</legend>
            <input defaultValue={user.company} type="text" name="company" />
          </fieldset>

          <fieldset>
            <legend>Feiertage</legend>
            <input defaultValue={user.holiday} type="number" name="holiday" />
          </fieldset>

          <fieldset>
            <legend>Urlaubstage</legend>
            <input defaultValue={user.dayOff} type="number" name="dayOff" />
          </fieldset>

          <fieldset>
            <legend>Krankheitstage</legend>
            <input defaultValue={user.sickDay} type="number" name="sickDay" />
          </fieldset>

          {/* <fieldset>
                <legend>Stunden insgesamgt</legend>
                <input defaultValue={user.totalHours} type="number" name="totalHours" />
            </fieldset> */}

          <button type="submit">Ändern</button>
        </fieldset>
        <button onClick={() => setShowWindow("")}>Abbrechen</button>
      </form>
    </dialog>
  );
};

export const EditTimeDialog = ({ setShowWindow, time, setTime, setUser}) => {
  return (
    <dialog open>
      <h2>Profil bearbeiten</h2>
      <form
        onSubmit={(e) => {
          editTargetValue(e, setTime, setUser)
          setShowWindow(false);
        }}
      >
        <fieldset>
          <legend>Zielzeit</legend>
          <input
            defaultValue={parseFloat(time.targetValue.split(" ")[0])}
            type="number"
            name="S"
            max={168}
            min={0}
          />
          <input
            defaultValue={parseFloat(time.targetValue.split(" ")[1])}
            type="number"
            name="M"
            max={59}
            min={0}
          />
        </fieldset>
        <button type="submit">Ändern</button>
        <button onClick={() => setShowWindow("")}>Abbrechen</button>
      </form>
    </dialog>
  );
};
