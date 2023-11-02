import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch('http://localhost:4000/loginProc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.status === 200) {
        alert('로그인이 되었습니다.');
        navigate('/');
      } else {
        // Handle other statuses or errors
        const data = await response.json();
        alert(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('There was an error during the login process:', error);
      alert('There was an error. Please try again later.');
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
