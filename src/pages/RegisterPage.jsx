import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    address: 'address',
    phone: '',
  });

  const [fieldError, setFieldError] = useState({
    email: false,
    password: false,
    fullName: false,
    address: false,
    phone: false,
  });

  const handlePhoneChange = (e) => {
    const validatePhoneNumber = e.target.value.replace(/\D/g, '').slice(0, 11);
    setFormData({ ...formData, phone: validatePhoneNumber });
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    const requiredFields = ['email', 'password', 'fullName'];

    const isMissingFields = requiredFields.some((field) => !formData[field]);

    if (isMissingFields) {
      setFieldError({
        ...fieldError,
        email: !formData.email,
        password: !formData.password,
        fullName: !formData.fullName,
        //Set other fields as required
      });
      return;
    } else {
      setFieldError(true);
    }

    const response = await fetch('http://localhost:4000/registProc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert('회원 등록이 되었습니다.');
      navigate('/');
    } else {
      // Handle other statuses or errors
      const data = await response.json();
      alert(data.message || 'Register failed!');
    }
  };

  return (
    <div>
      <MainStyle to="/">sticky lemon</MainStyle>
      <ContainerStyle>
        <SignUpHeaderStyle>Create account</SignUpHeaderStyle>
        <hr />
        <form>
          <FieldsetStyle>
            <LabelStyle htmlFor="email">Email</LabelStyle>
            <InputStyle
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{ borderColor: fieldError.email ? 'red' : '' }}
              id="email"
              type="email"
              name="email"
              autoComplete="off"
            />
          </FieldsetStyle>
          <FieldsetStyle>
            <LabelStyle htmlFor="password">Password</LabelStyle>
            <InputStyle
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="password"
              type="password"
              name="password"
              style={{ borderColor: fieldError.password ? 'red' : '' }}
              placeholder="Enter your password"
            />
          </FieldsetStyle>
          <FieldsetStyle>
            <LabelStyle htmlFor="fullName">Name</LabelStyle>
            <InputStyle
              placeholder="Enter your name"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              id="fullName"
              type="name"
              name="fullName"
              style={{ borderColor: fieldError.fullName ? 'red' : '' }}
              autoComplete="off"
            />
          </FieldsetStyle>
          <FieldsetStyle>
            <LabelStyle htmlFor="phone">Contact number</LabelStyle>
            <InputStyle
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handlePhoneChange}
              id="phone"
              type="number"
              name="phone"
              autoComplete="off"
            />
          </FieldsetStyle>
          <div>
            {(fieldError.email ||
              fieldError.password ||
              fieldError.fullName) && (
              <ErrorStyle>Please fill out all fields!</ErrorStyle>
            )}
          </div>
          <RegisterButtonStyle type="button" onClick={handleRegister}>
            Register
          </RegisterButtonStyle>
        </form>
        <hr />
        <SignInContainer>
          <LoginLinkStyle to="/login">go to sign in</LoginLinkStyle>
        </SignInContainer>
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
  padding: 20px;
  height: auto;
  display: block;
  background-color: #f1f5f1;
  border-radius: 10px;
  margin-bottom: 70px;
  font-family: monospace;
`;

const SignUpHeaderStyle = styled.div`
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

const RegisterButtonStyle = styled.button`
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

const SignInContainer = styled.div`
  margin-bottom: 30px;
`;

const LoginLinkStyle = styled(Link)`
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
  border-color: red;
`;
