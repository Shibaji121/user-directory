import React, { useEffect, useState } from "react";
import "../StopClock/StopClock.css";

const StopClock = ({ country }) => {
  const [datetime, setDatetime] = useState(0);

  useEffect(() => {
    const url = `http://worldtimeapi.org/api/timezone/${country}`;
    fetch(url)
      .then((response) => response.json())
      .then((time) => setDatetime(time?.datetime))
      .catch((error) => console.log(error));
  }, [country]);
  const timeStr = datetime.toString();
  const time = timeStr
    .substring(timeStr.indexOf("T") + 1, timeStr.indexOf("T") + 9)
    .split(":");
  const hour = time[0];
  const minute = time[1];
  const second = time[2];

  return (
    <div className="clock-container">
      <div className="clock-bg">
        <div className="clock">
          {hour} : {minute} : {second}
        </div>
      </div>
      <button type="submit">Pause/Start</button>
    </div>
  );
};

export default StopClock;
