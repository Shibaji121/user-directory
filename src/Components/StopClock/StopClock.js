import React from "react";
import "../StopClock/StopClock.css";

const StopClock = ({ country }) => {
  return (
    <div className="clock-container">
      <div className="clock-bg">
        <div className="clock">00 : 00 : 00</div>
      </div>
      <button type="submit">Pause/Start</button>
    </div>
  );
};

export default StopClock;
