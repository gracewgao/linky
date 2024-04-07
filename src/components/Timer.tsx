import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { Color } from "../constants/constants";

interface ITimer {
  time: number;
  started: boolean;
  setEnded: Dispatch<SetStateAction<boolean>>;
}

const TimerWrapper = styled.div`
  width: 100%;
  height: 10px;
  position: absolute;
`;

const TimerBar = styled.div<{ timerWidth: number }>`
  width: ${(props) => props.timerWidth}%;
  height: 100%;
  background-color: ${Color.YELLOW};
  transition: width 1s linear;
`;

function Timer(props: ITimer) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => {
          if (prevTime < props.time) {
            return prevTime + 1;
          } else {
            props.setEnded(true);
            clearInterval(props.time);
            setIsRunning(false);
            return prevTime;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, props.time]);

  useEffect(() => {
    if (props.started) {
      startTimer();
    } else {
      resetTimer();
    }
  }, [props.started]);

  const startTimer = () => {
    setElapsedTime(0);
    setIsRunning(true);
    props.setEnded(false);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setIsRunning(false);
    props.setEnded(false);
  };

  return (
    <TimerWrapper>
      <TimerBar timerWidth={100 - (elapsedTime / props.time) * 100} />
    </TimerWrapper>
  );
}

export default Timer;
