import { useContext } from "react";
import { Time } from "../../../../context/Context";
import "./tableFooter.css";

const TableFooter = () => {
  const { time, setTime } = useContext(Time);

  function splitTimeReverse(time) {
    if (!time || !time.actualTime || !time.targetValue) {
      return "00S 00M"; // Standardwert, wenn Werte fehlen
    }

    const actualTimeParts = time.actualTime.split(" ");
    const targetTimeParts = time.targetValue.split(" ");

    if (actualTimeParts.length < 2 || targetTimeParts.length < 2) {
      return "00S 00M"; // Falls die Werte unerwartet sind
    }

    const actualTimeStart = parseFloat(actualTimeParts[0]) || 0;
    const actualTimeEnd = parseFloat(actualTimeParts[1]) || 0;

    const targetValueStart = parseFloat(targetTimeParts[0]) || 0;
    const targetValueEnd = parseFloat(targetTimeParts[1]) || 0;

    let resultStart = actualTimeStart - targetValueStart;
 
    let resultEnd;

    if (resultStart < 0) {
      
      if (targetValueEnd < actualTimeEnd) {
     
        resultEnd = 60 - actualTimeEnd + targetValueEnd;
        resultStart += 1; 
      } else {

        resultEnd = actualTimeEnd - targetValueEnd;
      }
    } else {

      if (actualTimeEnd + targetValueEnd >= 60) {

        resultStart += 1;
        resultEnd = actualTimeEnd + targetValueEnd - 60;
      } else {
        
        resultEnd = actualTimeEnd + targetValueEnd;
      }
    }    

    const test = targetValueEnd === 0 ? 60 : targetValueEnd;
    let remainder;
    if (actualTimeStart < targetValueStart && actualTimeEnd < test) {
      remainder = actualTimeEnd - test;
    }

    console.log(actualTimeStart, actualTimeEnd);
    
    
    // Zeitformatierung
    const formatTime = (time) =>
      Math.abs(time) < 10 ? `0${Math.abs(time)}` : `${Math.abs(time)}`;
    
    const sign = resultStart <= 0 && remainder < 0 ? "-" : "+";
    
    // Rückgabe im gewünschten Format
    return `${sign}${formatTime(resultStart)}S ${formatTime(resultEnd)}M`;
    
  }
  
  return (
    <>
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
    </>
  );
};

export default TableFooter;
