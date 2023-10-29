import React, { useState } from 'react';
import styled from 'styled-components';
import { apiClient } from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleQuantityChange = (event) => {
    const enteredQuantity = parseInt(event.target.value, 10) || 1;
    setQuantity(Math.max(1, enteredQuantity));
  };

  const checkLogIn = async () => {
    console.log(document.cookie);

    try {
      const productsUrl = '/cart';
      const result = await apiClient({
        url: productsUrl,
        method: 'POST',
        data: {
          itemId: `${item.itemValue}`,
          itemQuantity: `${quantity}`,
        },
      });
      // POST 요청이 성공하면 cart 페이지로 이동
      console.log('장바구니 담기 성공');
      navigate('/cart');
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

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
      <SubmitButton onClick={checkLogIn}>ADD</SubmitButton>
    </div>
  );
};

export default QuantityPicker;
