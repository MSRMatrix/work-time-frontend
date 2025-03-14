import { useContext, useState } from "react";
import { Time, User } from "../../../../context/Context";
import { calculateTime } from "../../calculateTime";
import { handleCheckboxChange } from "../../handleCheckboxChange";
import { getData } from "../../getData";

const TableBody = ({ days, changeValue, disableInputs }) => {
  const { time, setTime } = useContext(Time);
  const { user, setUser } = useContext(User);

  return (
    <>
      {time && time?.month
        ? time.month?.map((item, key) => (
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
                    onClick={(e) =>
                      calculateTime(e, item, time, setTime, setUser)
                    }
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
                <td style={{ display: "flex" }}> <legend>U</legend>
                  <input
                    type="checkbox"
                    name="holiday"
                    onChange={(e) => {
                      handleCheckboxChange(e, item.date, setTime, setUser),
                        getData(setTime, setUser);
                    }}
                    checked={item.holiday}
                    disabled={
                      disableInputs ||
                      item.dayOff ||
                      item.sickDay ||
                      item.day === days[0] ||
                      item.day === days[1]
                    }
                  /><legend>K</legend>
                  <input
                    type="checkbox"
                    name="sickDay"
                    onChange={(e) => {
                      handleCheckboxChange(e, item.date, setTime, setUser),
                        getData(setTime, setUser);
                    }}
                    checked={item.sickDay}
                    disabled={
                      disableInputs ||
                      item.dayOff ||
                      item.holiday ||
                      item.day === days[0] ||
                      item.day === days[1]
                    }
                  />
                  <legend>F</legend>
                  <input
                    type="checkbox"
                    name="dayOff"
                    onChange={(e) => {
                      handleCheckboxChange(e, item.date, setTime, setUser),
                        getData(setTime, setUser);
                    }}
                    checked={item.dayOff}
                    disabled={
                      disableInputs ||
                      item.holiday ||
                      item.sickDay ||
                      item.day === days[0] ||
                      item.day === days[1]
                    }
                  />
                  
                 
                </td>
              </tr>
            </tbody>
          ))
        : ""}
    </>
  );
};

export default TableBody;
