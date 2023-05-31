import React, { useEffect, useState } from "react";
import "./StopwatchComponent.css";
const StopwatchComponent = () => {
  const [time, setTime] = useState(0);
  const [appRunning, setRunning] = useState(false);
  const [lapDetails, setLapDetails] = useState([]);
  useEffect(
    () => {
      //This is the callback function i.e. the first argument of useEffect()
      //initializing the interval variable
      let interval = 0;
      if (appRunning === true) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (!appRunning) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    },
    //This is the dependency array of useEffect() i.e. the second argument of useEffect()
    [appRunning]
  );

  const handleLapClick = () => {
    const lapCount = lapDetails.length + 1;
    const lapTime = time;

    const lapDetail = {
      lapCount,
      lapTime,
    };

    setLapDetails((prevLapDetails) => [...prevLapDetails, lapDetail]);
  };

  return (
    <React.Fragment>
      <div className="stopwatch">
        <h2>Stop Watch</h2>
        <div className="numbers">
          <span id="hour">
            {("0" + Math.floor((time / 3600000) % 24)).slice(-2)}
          </span>
          <span className="colon">:</span>
          <span id="minutes">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
          </span>
          <span className="colon">:</span>
          <span id="seconds">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
          </span>
          <span className="colon">:</span>
          <span id="milliSec">{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="buttons">
          {appRunning ? (
            <button onClick={() => setRunning(false)}>Stop</button>
          ) : (
            <button onClick={() => setRunning(true)}>Start</button>
          )}
          {!appRunning && (
            <button
              onClick={() => {
                setTime(0);
                setLapDetails([]);
              }}
            >
              Reset
            </button>
          )}

          <button onClick={handleLapClick}>Lap</button>
        </div>
        <div className="lapDetails">
          {lapDetails.map((lap) => (
            <div key={lap.lapCount} className="lap">
              <span className="lapCount">Lap {lap.lapCount}</span>
              <span className="lapTime">
                {("0" + Math.floor((lap.lapTime / 3600000) % 24)).slice(-2) +
                  ":" +
                  ("0" + Math.floor((lap.lapTime / 60000) % 60)).slice(-2) +
                  ":" +
                  ("0" + Math.floor((lap.lapTime / 1000) % 60)).slice(-2) +
                  ":" +
                  ("0" + ((lap.lapTime / 10) % 100)).slice(-2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StopwatchComponent;
