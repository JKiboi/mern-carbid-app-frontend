import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import PaymentPage from "./components/PaymentPage";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
