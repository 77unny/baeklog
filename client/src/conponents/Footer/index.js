import React from 'react';
import {Container} from './Footer.style'

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Container>©{year} Created by baekCo</Container>
  );
}

export default Footer;