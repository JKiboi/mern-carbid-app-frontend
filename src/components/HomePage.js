import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import CountdownTimer from "./CountdownTimer";

import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import loadingGif from "../assets/loading.gif";

const HomePage = () => {
  const [winner, setWinner] = useState(null);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const getWinner = async () => {
    socket.emit("getWinner");

    try {
      const response = await fetch("/api/winner");
      const data = await response.json();
      setWinner(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("winner", (data) => {
      setWinner(data);
      setTimerCompleted(true);
    });
  }, [socket]);

  useEffect(() => {
    if (countdownFinished) {
      const timer = setTimeout(() => {
        setTimerCompleted(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [countdownFinished]);

  const renderContent = () => {
    if (!timerCompleted) {
      return (
        <CountdownTimer
          getWinner={getWinner}
          onCountdownFinish={() => setCountdownFinished(true)}
        />
      );
    } else {
      return (
        <>
          <LoadingContainer>
            <LoadingGif src={loadingGif} />
            <LoadingText>Inazunguka... Inazunguka...</LoadingText>
          </LoadingContainer>
          {winner && (
            <WinnerContainer>
              <WinnerText>And the winner is...</WinnerText>
              <WinnerTextLarge>{winner.name}</WinnerTextLarge>
              <WinnerText>Phone number: {winner.phone}</WinnerText>
            </WinnerContainer>
          )}
        </>
      );
    }
  };

  useEffect(() => {
    if (timerCompleted) {
      const timer = setTimeout(() => {
        setWinner(null);
        setCountdownFinished(false);
        setTimerCompleted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [timerCompleted]);

  return (
    <Container>
      <Title>Ford Mustang Shelby GT500 Auction</Title>
      {renderContent()}
      <CarImagesContainer>
        <CarImage src={car1} />
        <CarImagesSmallContainer>
          <CarImageSmall src={car2} />
          <CarImageSmall src={car3} />
        </CarImagesSmallContainer>
      </CarImagesContainer>
      <DescriptionContainer>
        <DescriptionTitle>1967 Ford Mustang Shelby GT500</DescriptionTitle>
        <DescriptionText>
          The 1967 Ford Mustang Shelby GT500 is a classic American muscle car,
          known for its distinctive design and powerful engine. This particular
          model has been fully restored and is in excellent condition. It has a
          V8 engine with 428 cubic inches of displacement, producing 355
          horsepower and 420 lb-ft of torque. It also has a 4-speed manual
          transmission and a limited-slip differential, making it a joy to
          drive. Don't miss your chance to own a piece of automotive history!
        </DescriptionText>
        <AdditionalDetailsLink
          href="https://www.ford.com/performance/gt500/"
          target="_blank"
        >
          Learn More
        </AdditionalDetailsLink>
        <ButtonContainer>
          <Link to="/payment">
            <Button>Place Bid</Button>
          </Link>
        </ButtonContainer>
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media only screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  margin-top: 0;

  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  @media only screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

const LoadingGif = styled.img`
  height: 150px;

  @media only screen and (max-width: 768px) {
    height: 100px;
  }
`;

const LoadingText = styled.p`
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const WinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  @media only screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;

const WinnerText = styled.p`
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const WinnerTextLarge = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const CarImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  @media only screen and (max-width: 768px) {
    margin-top: 30px;
    flex-direction: column;
    align-items: center;
  }
`;

const CarImage = styled.img`
  height: 400px;
  margin-right: 50px;

  @media only screen and (max-width: 768px) {
    height: 300px;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const CarImagesSmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const CarImageSmall = styled.img`
  height: 200px;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    height: 100px;
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const DescriptionContainer = styled.div`
  margin-top: 50px;
  max-width: 800px;

  @media only screen and (max-width: 768px) {
    margin-top: 30px;
    max-width: 100%;
  }
`;

const DescriptionTitle = styled.h2`
  font-size:
30px;
margin-top: 0;

@media only screen and (max-width: 768px) {
font-size: 24px;
}
`;

const DescriptionText = styled.p`
font-size: 20px;

@media only screen and (max-width: 768px) {
font-size: 16px;
}
`;
const AdditionalDetailsLink = styled.a`
  display: flex;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  color: blue;
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 50px;

@media only screen and (max-width: 768px) {
margin-top: 30px;
}
`;

const Button = styled.button`
background-color: #4CAF50;
color: white;
padding: 14px 20px;
margin: 8px 0;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 20px;

&:hover {
background-color: #3e8e41;
}

@media only screen and (max-width: 768px) {
font-size: 16px;
}
`;


export default HomePage;
