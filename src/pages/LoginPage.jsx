import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

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
      <ContainerStyle>
        <SigninStyle>
          <hr />
          Sign in
        </SigninStyle>
        <form>
          <FieldsetStyle>
            <LabelStyle htmlFor="email">Email&nbsp;</LabelStyle>
            <InputStyle
              placeholder="Enter email"
              required
              ref={emailRef}
              id="email"
              type="email"
              name="email"
              autoComplete="off"
            />
          </FieldsetStyle>
          <FieldsetStyle>
            <LabelStyle htmlFor="password">Password&nbsp;</LabelStyle>
            <InputStyle
              required
              ref={passwordRef}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </FieldsetStyle>
          <LoginButtonStyle type="submit" onClick={submitForm}>
            Login
          </LoginButtonStyle>
          <hr />
          <div>
            <SignUpStyle to="/register">Create new account</SignUpStyle>
          </div>
        </form>
      </ContainerStyle>
      <Footer />
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
  margin: 30px;

  font-family: monospace;
`;

const ContainerStyle = styled.div`
  max-width: 370px;
  margin: 0 auto;
  display: block;
  background-color: #f1f5f1;
  border-radius: 10px;
  margin-bottom: 75px;
  font-family: monospace;
`;

const SigninStyle = styled.div`
  font-size: 25px;
  margin: 14px;
`;

const FieldsetStyle = styled.fieldset`
  border: none;
  font-size: 15px;
`;

const LabelStyle = styled.label`
  display: block;
`;

const InputStyle = styled.input`
  width: 320px;
  font-size: 25px;
  border-radius: 13px;
  border: 1px solid;
  font-family: monospace;
  text-align: center;

  &::placeholder {
    color: lightgray;
  }
`;

const LoginButtonStyle = styled.button`
  width: 320px;
  font-size: 25px;
  margin: 20px;
  border-radius: 13px;
  border: 1px solid;
  font-family: monospace;
  cursor: pointer;
  &:hover {
    color: pink;
    transition: all 100ms ease-in-out;
  }
`;

const SignUpStyle = styled(Link)`
  display: flex;
  justify-content: center;
  color: black;
  width: 320px;
  font-size: 25px;
  margin: 20px;
  text-decoration: none;
  border-radius: 13px;
  border: 1px solid;
  font-family: monospace;

  &:hover {
    color: pink;
    transition: all 100ms ease-in-out;
  }
`;
