import { useContext } from "react";
import { Time } from "../../../../context/Context";
import "./tableFooter.css"

const TableFooter = () => {
  const { time, setTime } = useContext(Time);
  return (
    <>
      <div className="table-footer">
          <p>Soll AZ: {time ? time.targetValue : ""}</p>
          <p>Ist AZ: {time ? time.actualTime : ""}</p>
          <p>
            Plus/Minus: 00S 00M
            {/* {time ? time.actualTime - time.targetValue : ""} */}
          </p>
      </div>
    </>
  );
};

export default TableFooter;
