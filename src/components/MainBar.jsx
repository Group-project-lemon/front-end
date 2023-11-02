import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';

export default function MainBar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const userInfoData = await apiClient({
        url: '/userInfo',
        credentials: 'include',
      });
      setUserInfo(userInfoData);
    } catch (error) {
      setUserInfo({});
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        alert('로그아웃이 되었습니다.');
        setUserInfo({});
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.message || 'Logout failed!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userInfo);
  console.log(userInfo.email);

  const isLogin = userInfo && userInfo.email;

  return (
    <>
      <Container>
        <ButtonsStyle>
          <ShippingStyle>free shipping over 50,000won in Korea</ShippingStyle>

          {isLogin ? (
            <>
              <CartStyle to="/cart">CART</CartStyle>
              <CartStyle onClick={logout}>LOGOUT</CartStyle>
            </>
          ) : (
            <>
              <CartStyle to="/login">LOGIN</CartStyle>
              <CartStyle to="/register">SIGNUP</CartStyle>
            </>
          )}
        </ButtonsStyle>
      </Container>
      <LogoStyle to="/">sticky lemon</LogoStyle>
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
    </>
  );
}

const Container = styled.div`
  background-color: #ccc8f1;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

const ButtonsStyle = styled.div`
  flex-grow: 1; // 이를 추가하여 가능한 많은 공간을 차지하게 합니다.
  display: flex;
  justify-content: center; // 내용을 중앙에 배치합니다.
  align-items: center;
  color: white;
`;

const ShippingStyle = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartStyle = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-left: 30px;
  margin-right: 10px;
  color: #82693d;
  &:hover {
    color: #9a8673;
  }
`;

const LogoStyle = styled(Link)`
  flex-grow: 1; // 이를 추가하여 가능한 많은 공간을 차지하게 합니다.
  display: flex;
  justify-content: center; // 내용을 중앙에 배치합니다.
  align-items: center;

  color: black;
  margin: 20px;
  font-size: 30px;
  text-decoration: none;
  font-family: monospace;
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
    transition: all 200ms ease-in-out;
  }
`;

// const CategoryContainer = styled.nav`
//   display: flex;
//   justify-content: center;

//   text-align: center;
// `;

// const CategoryStyle = styled(Link)`
//   text-decoration: none;
//   color: #82693d;
//   &:hover {
//     color: #e4c6b0;
//   }
// `;
