import { useContext, useState } from "react";
import { Time, User } from "../context/Context";
import "./print.css";
import { splitTimeReverse } from "../functions/splitTimeReverse";

const Print = () => { 
    const { time, setTime } = useContext(Time);
    const { user, setUser } = useContext(User);
    const days = ["samstag", "sonntag"];
    const [disableInputs, setDisableInputs] = useState(false);
    const [chooseMonth, setChooseMonth] = useState({
        month: "",
        year: "",
    });


    
    return(
        <div
            className="document-container"
            style={{
                background: time && time.backgroundColor ? time.backgroundColor : "",
                color: time && time.fontColor ? time.fontColor : "",
            }}
        ><h1>Arbeitszeiten</h1>
        <div>
          <p>Name: {user.name}</p>
          <p>Firma: {user.company}</p>
        </div>

  <div>
          <p>Stunden Vormonat: {time.hoursFromLastMonth}</p>
        </div>

        <div>
          <p>Feiertage: {user.holiday}</p>
          <p>Urlaubstage: {user.dayOff}</p>
          <p>Krankheitstage: {user.sickDay}</p>
        </div>
        


            <table className="data-table">
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
                </thead>
                {time && time?.month
                    ? time.month?.map((item, key) => (
                        <tbody
                            key={key}
                            style={{
                                background:
                                    item.day === days[0] || item.day === days[1]
                                        ? "gray"
                                        : item.sickDay ? "red" : item.dayOff ? "green" : item.holiday ? "blue" : ""
                            }}
                        >
                            <tr>
                                <td>{item.date}</td>
                            </tr>
                            {item.startWork && item.endWork ? (
                                <>
                                    <tr>
                                        <td>{item.startWork}</td>
                                        <td>-</td>
                                        <td>{item.endWork}</td>
                                    </tr>
                                  {item.startBreak && item.endBreak ?  <tr>
                                        <td>{item.startBreak}</td>
                                        <td>-</td>
                                        <td>{item.endBreak}</td>
                                    </tr> : 
                                    <tr>
                                    <td>Keine Pause</td>
                                </tr> 
                                    }
                                </>
                            ) : (
                                <tr>
                                    <td style={{width: "16.8em"}}>
                                        {item.sickDay ? "Krankheitstag" : item.dayOff ? "Urlaubstag" : item.holiday ? "Feiertag" : days[0] === item.day ? "Samstag" : days[1] === item.day ? "Sonntag" : "Nichts angegeben" }
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>{item.totalTime}</td>
                            </tr>
                        </tbody>
                    ))
                    : ""}
            </table>
            <div className="table-footer">
        <p>Soll AZ: {time ? time.targetValue : ""}</p>
        <p>Ist AZ: {time ? time.actualTime : ""}</p>
        <p
          style={{
            color:
             splitTimeReverse(time).split("").includes("-")
                ? "red"
                : "green",
          }}
        >
          Plus/Minus: {splitTimeReverse(time)}
        </p>
      </div>
        </div>
    );
};

export default Print;