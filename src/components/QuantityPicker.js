import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const QuantityInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 8px;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

const QuantityPicker = (item) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const enteredQuantity = parseInt(event.target.value, 10) || 1;
    setQuantity(Math.max(1, enteredQuantity));
  };

  const checkLogIn = () => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      // 저장된 세션 정보가 있는 경우, JSON 문자열을 파싱하여 JavaScript 객체로 변환
      const session = JSON.parse(storedSession);

      // 이제 'session' 변수를 사용하여 세션 정보에 접근할 수 있습니다.
      console.log(session.userId); // 예: 123
      console.log(session.username); // 예: "exampleUser"
      // 다른 세션 정보들을 필요에 따라 사용할 수 있습니다.
    } else {
      // 저장된 세션 정보가 없는 경우, 사용자가 로그인해야 할 수 있습니다.
      // 로그인 페이지로 리디렉션 또는 사용자에게 로그인을 요청하는 메시지를 표시하는 등의 조치를 취할 수 있습니다.
    }
  };

  // post로 장바구니 정보 데이터 베이스에 구현하기

  return (
    <div>
      <QuantityInputContainer>
        <Label htmlFor="quantity">Quantity:</Label>
        <QuantityInput
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </QuantityInputContainer>
      <Link to={`/cart/?itemId=${item.itemValue}&itemQuantity=${quantity}`}>
        <SubmitButton onClick={checkLogIn}>ADD</SubmitButton>
      </Link>
    </div>
  );
};

export default QuantityPicker;
