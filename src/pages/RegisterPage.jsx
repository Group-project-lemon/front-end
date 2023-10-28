import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiClient } from '../utils/apiClient';

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email);
    console.log(password);

    try {
      const response = await apiClient({
        method: 'POST',
        url: '/register',
        data: { 
          email: `${email}`, 
          password: `${password}`,
         },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response.status)
      if (response === '로그인 성공') {
        // 로그인 성공 시 홈페이지로 이동
        alert('로그인 성공');
        navigate('/shopall');
      } else if (response === '이메일 또는 비밀번호가 누락') {
        // 로그인 실패 시 오류 메시지 표시
        alert('로그인 실패: 아이디 또는 비밀번호 모두를 입력해주세요.');
      } else if (response === '데이터베이스 오류') {
        // 로그인 실패 시 오류 메시지 표시
        alert('데이터베이스 오류.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };
    
  return (
    <div>
      <MainStyle to="/">sticky lemon</MainStyle>
      <form>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter email."
            required
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            required
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="Enter password."
          />
        </fieldset>
        <button type="submit" onClick={submitForm}>
          Register
        </button>
      </form>
    </div>
  );
}

const MainStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 40px;
  text-decoration: none;
`;
