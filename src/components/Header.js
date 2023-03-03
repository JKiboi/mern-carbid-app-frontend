import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logoImage.jpg';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 20px 32px;
  background-color: #0072C6;
  color: #fff;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 20px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const NavLinks = styled.nav`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  font-size:30px;
  font-weight:500;
`;


const NavLink = styled(Link)`
  margin-left: 32px;
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #f2f2f2;
  }
`;

const MobileViewButton = styled.button`
  margin-left: 32px;
  padding: 8px 16px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #0072C6;
  }
`;

function Header() {
  return (
    <HeaderContainer>
       <LogoContainer>
        <LogoImage src={logoImage} />
      </LogoContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/payment">Pay Now</NavLink>
      </NavLinks>
      <MobileViewButton>View on Mobile</MobileViewButton>
    </HeaderContainer>
  );
}

export default Header;
