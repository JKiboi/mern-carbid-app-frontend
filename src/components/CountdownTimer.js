import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import loadingGif from "../assets/loading.gif"; 

const CountdownTimer = ({ endTime, onTimerEnd }) => {
  const fallbackEndTime = new Date(Date.now() + 2 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasEnded, setHasEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [endTime]);

  useEffect(() => {
    if (timeLeft.total <= 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setHasEnded(true);
      }, 5000);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (hasEnded) {
      const timeoutId = setTimeout(onTimerEnd, 60 * 60 * 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [hasEnded, onTimerEnd]);

  function calculateTimeLeft() {
    const difference = +(endTime ? new Date(endTime) : fallbackEndTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference
      };
    }

    return timeLeft;
  }

  return (
    <Timer>
      {timeLeft.total > 0 && !isLoading ? (
        <>
          <TimeUnit>{timeLeft.days}d</TimeUnit>
          <TimeUnit>{timeLeft.hours}h</TimeUnit>
          <TimeUnit>{timeLeft.minutes}m</TimeUnit>
          <TimeUnit>{timeLeft.seconds}s</TimeUnit>
        </>
      ) : isLoading ? (
        <LoadingContainer>
          <LoadingGif src={loadingGif} />
          <LoadingText>Inazunguka... Inazunguka...</LoadingText>
        </LoadingContainer>
      ) : (
        <></>
      )}
    </Timer>
  );
};

const Timer = styled.div`
  display: flex;
`;

const TimeUnit = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-right: 8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoadingGif = styled.img`
  width: 200px;
  height: 200px;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 24px;
  font-weight: bold;
`;

export default CountdownTimer;
