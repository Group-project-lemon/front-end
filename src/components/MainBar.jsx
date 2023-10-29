import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function MainBar() {
  return (
    <div>
      <Container>
        <HeaderStyle>free shipping above € 100 in the Netherlands</HeaderStyle>
        <ButtonsStyle>
          <CartStyle to="/cart">shopping cart</CartStyle>
          <CartStyle to="/login">
            <div>Sign up</div>
          </CartStyle>
        </ButtonsStyle>
      </Container>
      <MainStyle to="/">sticky lemon</MainStyle>
      <NavStyle>
        <OrderedList>
          <li>
            <StyledLink to="/">shop all</StyledLink>
          </li>
        </OrderedList>
        <OrderedList>
          <li>
            <StyledLink to="/products/bag">bags</StyledLink>
          </li>
        </OrderedList>
        <OrderedList>
          <li>
            <StyledLink to="/products/footwear">footwear</StyledLink>
          </li>
        </OrderedList>
        <OrderedList>
          <li>
            <StyledLink to="/products/accessories">accessories</StyledLink>
          </li>
        </OrderedList>
      </NavStyle>
    </div>
  );
}

const Container = styled.div`
  background-color: #ccc8f1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderStyle = styled.div`
  width: 1500px;
  color: white;
  text-align: center;
`;

const ButtonsStyle = styled.div`
  margin-right: 35px;
  display: flex;
`;

const CartStyle = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-left: 35px;
  color: white;
`;

const MainStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: black;
  font-size: 40px;
  text-decoration: none;
`;

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderedList = styled.ol`
  list-style-type: none;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  color: #82693d;
  text-decoration: none;

  &:hover {
    color: #e4c6b0;
  }
`;
