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
        url: '/login',
        data: {
          email: `${email}`,
          password: `${password}`,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.success === '로그인 성공') {
        // 로그인이 성공하면 서버에서 세션 ID를 받아 쿠키에 저장
        const sessionId = response.user.id;
        console.log(sessionId);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        // 세션 ID를 쿠키로 저장//path는 쿠키에 접근할 수 있는 경로는 현재/로 설정되어 있으니 모든 경로에서 접근이 가능
        document.cookie = `session_id=${sessionId}; expires=${expirationDate.toUTCString()}; path=/`;
        console.log(document.cookie);

        // 로그인 성공 시 홈페이지로 이동
        alert('로그인 성공');
        navigate('/shopall');
      } else if (response === '이메일 또는 비밀번호가 누락') {
        // 로그인 실패 시 오류 메시지 표시
        alert('로그인 실패: 아이디 또는 비밀번호 모두를 입력해주세요.');
      } else if (response === '데이터베이스 오류') {
        // 로그인 실패 시 오류 메시지 표시
        alert('데이터베이스 오류.');
      } else if (response === '사용자가 없음') {
        // 로그인 실패 시 오류 메시지 표시
        alert('사용자가 없습니다. ');
        navigate('/register');
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
          Login
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
