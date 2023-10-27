// import { apiClient } from "./utils/apiClient";
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// // 상품 목록 호출 함수
// const getMainBar = () => {
//   return apiClient({
//     url: "/",
//   });
// };

// function Dropdown() {
//   const [selectedValue, setSelectedValue] = useState(''); // State to store the selected value

//   const handleSelectChange = (e) => {
//     setSelectedValue(e.target.value);
//   };

//   return (
//     <div>
//       <select value={selectedValue} onChange={handleSelectChange}>
//         <option value="">Sign in</option>
//         <option value="option1">my orders</option>
//         <option value="option2">my addresses</option>
//         <option value="option3">my account</option>
//         <br />
//         <option value="option3">log out</option>
//       </select>
//       <p>Selected option: {selectedValue}</p>
//     </div>
//   );
// }

export default function MainBar() {
  return (
    <div>
      <Container>
        <HeaderStyle>free shipping above € 100 in the Netherlands</HeaderStyle>
        <ButtonsStyle>
          <CartStyle to="/cart">shopping cart</CartStyle>
          <CartStyle to="/register">
            <div>Sign up{/* <Dropdown /> */}</div>
          </CartStyle>
        </ButtonsStyle>
      </Container>
      <MainStyle to="/">sticky lemon</MainStyle>
      <NavStyle>
        <OrderedList>
          <li>
            <StyledLink to="/">shop all</StyledLink>
          </li>
        </OrderedList>
        <OrderedList>
          <li>
            <StyledLink to="/products/bags">bags</StyledLink>
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
    </div>
  );
}

const Container = styled.div`
  background-color: #ccc8f1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderStyle = styled.div`
  width: 1500px;
  color: white;
  text-align: center;
`;

const ButtonsStyle = styled.div`
  margin-right: 35px;
  display: flex;
`;

const CartStyle = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-left: 35px;
  color: white;
`;

const MainStyle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: black;
  font-size: 40px;
  text-decoration: none;
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
  }
`;
