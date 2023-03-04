import React, { useState } from "react";
import { SuccessMessage, ErrorMessage } from "./SuccessMessage";
import axios from "axios";
import config from "../config/config";
import styled from "styled-components";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.backendUrl}/api/payments/process-payment`, {
        name,
        phone,
        amount,
      });
      setPaymentStatus("success");
      console.log(response.data);
    } catch (error) {
      setPaymentStatus("error");
      console.error(error);
    }
  };
  return (
    <Container>
      <Title>Payment Page</Title>
      {paymentStatus === "success" ? (
        <SuccessMessage />
      ) : paymentStatus === "error" ? (
        <ErrorMessage />
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <FormInput
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormLabel htmlFor="phone">Phone Number:</FormLabel>
          <FormInput
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <FormLabel htmlFor="amount">Amount:</FormLabel>
          <FormInput
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <PayButton type="submit">Pay Now</PayButton>
        </Form>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  width: 60%;
`;

const FormLabel = styled.label`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #000;
`;

const FormInput = styled.input`
  font-size: 2rem;
  width: 60%;
  margin-bottom: 2rem;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const PayButton = styled.button`
  font-size: 2.5rem;
  font-weight: bold;
  padding: 1.5rem 3rem;
  border: none;
  border-radius: 5px;
  background-color: #3caea3;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #298f86;
  }
`;

export default PaymentPage;
