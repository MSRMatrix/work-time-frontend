import { useContext } from "react";
import { Time } from "../../../../context/Context";
import "./tableFooter.css";
import { splitTimeReverse } from "../../../../functions/splitTimeReverse";

const TableFooter = () => {
  const { time, setTime } = useContext(Time);

 
  
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
