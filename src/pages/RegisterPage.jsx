import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: 'fullname',
    address: 'address',
    phone: 'phone',
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("click register button");
    const response = await fetch("http://localhost:4000/registProc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 200) {
      alert("회원 등록이 되었습니다.");
      navigate("/");
    } else {
      // Handle other statuses or errors
      const data = await response.json();
      alert(data.message || "Login failed!");
    }
  };

  return (
    <div>
      <MainStyle to="/">sticky lemon</MainStyle>
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
        <button type="button" onClick={handleRegister}>
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
