import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-20px);
  }
  40% {
    transform: translateX(20px);
  }
  60% {
    transform: translateX(-20px);
  }
  80% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
`;

const StyledSuccessMessage = styled.div`
  font-size: 2.5rem;
  color: green;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SuccessMessage = () => {
  return (
    <StyledSuccessMessage>
      Bid Successful, Good Luck hustler!!
    </StyledSuccessMessage>
  );
};

const StyledErrorMessage = styled.div`
  font-size: 2.5rem;
  color: red;
  text-align: center;
  animation: ${shake} 0.5s ease-in-out;
`;

const ErrorMessage = () => {
  return <StyledErrorMessage>Payment Failed!</StyledErrorMessage>;
};

export { SuccessMessage, ErrorMessage };
