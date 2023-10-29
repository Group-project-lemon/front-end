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

  console.log(userInfo)
  console.log(userInfo.email)

  const isLogin = userInfo && userInfo.email;

  return (
    <Container>
      <LogoStyle to="/">STICKY LEMON</LogoStyle>
      <ButtonsStyle>
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
  display: flex;
`;

const CartStyle = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-left: 35px;
  color: white;
`;

const LogoStyle = styled(Link)`
  flex-grow: 1; // 이를 추가하여 가능한 많은 공간을 차지하게 합니다.
  display: flex;
  justify-content: center; // 내용을 중앙에 배치합니다.
  align-items: center;

  color: white;
  font-size: 40px;
  text-decoration: none;
`;
