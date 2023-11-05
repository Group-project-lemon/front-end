import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

export default function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError(true);
      return;
    } else {
      setError(false);
    }
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
        alert('Login successfully');
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
          <div>
            {error && <ErrorStyle>Please fill out all fields!</ErrorStyle>}
          </div>
          <LoginButtonStyle type="submit" onClick={submitForm}>
            Login
          </LoginButtonStyle>
          <hr />
          <SignUpContainer>
            <SignUpStyle to="/register">Create new account</SignUpStyle>
          </SignUpContainer>
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
  height: 400px;
  padding: 20px;
  display: block;
  background-color: #f1f5f1;
  border-radius: 10px;
  margin-bottom: 70px;
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
    font-size: 17px;
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

const SignUpContainer = styled.div`
  margin-bottom: 30px;
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

const ErrorStyle = styled.p`
  color: red;
  text-align: center;
`;
