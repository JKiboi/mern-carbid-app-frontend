import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: #0072C6;
  color: #fff;
  padding: 20px 16px;
`;

const FooterText = styled.p`
  margin: 0;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLink = styled.a`
  color: #fff;
  margin: 0 8px;
  font-size: 20px;
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterText>© {currentYear} My App. All rights reserved.</FooterText>
      <SocialIcons>
        <IconLink href="https://www.facebook.com/"><FaFacebook /></IconLink>
        <IconLink href="https://twitter.com/"><FaTwitter /></IconLink>
        <IconLink href="https://web.whatsapp.com/"><FaWhatsapp /></IconLink>
      </SocialIcons>
    </FooterContainer>
  );
}

export default Footer;
