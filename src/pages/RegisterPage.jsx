import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    address: 'address',
    phone: '',
  });

  const handlePhoneChange = (e) => {
    const validatePhoneNumber = e.target.value.replace(/\D/g, '').slice(0, 11);
    setFormData({ ...formData, phone: validatePhoneNumber });
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log('click register button');
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
      <div>
        <h1>Create account</h1>
        <form>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="fullName">Name</label>
            <input
              placeholder="Enter your name"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              id="fullName"
              type="name"
              name="fullName"
              autoComplete="off"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="phone">Contact number</label>
            <input
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              id="phone"
              type="number"
              name="phone"
              autoComplete="off"
            />
          </fieldset>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
        <div>
          If you have an existing account,&nbsp;
          <Link to="/login">click here to sign in</Link>
        </div>
      </div>
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
