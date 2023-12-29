import React, { useEffect, useState } from "react";
import "../StopClock/StopClock.css";

const StopClock = ({ country }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");

  useEffect(() => {
    const fetchData = async () => {
      let timedate;
      try {
        const url = `https://worldtimeapi.org/api/timezone/${country}`;
        const response = await fetch(url);
        timedate = await response.json();
      } catch (error) {
        console.error(error);
      }
      const timeStr = timedate?.datetime.toString();
      const time = timeStr
        .substring(timeStr.indexOf("T") + 1, timeStr.indexOf("T") + 9)
        .split(":");
      const hour = parseInt(time[0], 10);
      const minute = parseInt(time[1], 10);
      const second = parseInt(time[2], 10);
      setHour(hour.toString().padStart(2, "0"));
      setMinute(minute.toString().padStart(2, "0"));
      setSecond(second.toString().padStart(2, "0"));
    };
    fetchData();
  }, [country]);

  useEffect(() => {
    const runTimer = () => {
      let intSecond = parseInt(second, 10);
      let intMinute = parseInt(minute, 10);
      let intHour = parseInt(hour, 10);
      if (!isPaused) {
        intSecond = intSecond + 1;
        if (intSecond === 60) {
          intSecond = 0;
          intMinute = intMinute + 1;
        }
        if (intMinute === 60) {
          intMinute = 0;
          intHour = intHour + 1;
        }
        if (intHour === 24) {
          intHour = 0;
        }
      }
      setHour(intHour.toString().padStart(2, "0"));
      setMinute(intMinute.toString().padStart(2, "0"));
      setSecond(intSecond.toString().padStart(2, "0"));
    };

    const intervalId = setInterval(runTimer, 1000);
    if (isPaused) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [minute, second, hour, isPaused]);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => {
      return !prevIsPaused;
    });
  };

  return (
    <div className="clock-container">
      <div className="clock-bg">
        <div className="clock">
          {hour} : {minute} : {second}
        </div>
      </div>
      <button type="button" onClick={togglePause}>
        {isPaused ? "Start" : "Pause"}
      </button>
    </div>
  );
};

export default StopClock;
