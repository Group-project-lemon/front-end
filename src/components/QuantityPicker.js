import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const QuantityPicker = (item) => {
  const [formData, setFormData] = useState({
    itemsId: Number(item.itemValue),
    quantity: 1,
  });

  const handleQuantityChange = (event) => {
    const enteredQuantity = parseInt(event.target.value, 10) || 1;

    setFormData({
      ...formData,
      quantity: Math.max(1, enteredQuantity),
    });
  };

  const addCart = async () => {
    try {
      const response = await fetch('http://localhost:4000/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 200) {
        alert('카트에 담았습니다.');
      } else {
        alert('카트에 담지 못했습니다.');
      }
    } catch (error) {
      alert('카트에 담지 못했습니다.');
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
          value={formData.quantity}
          onChange={handleQuantityChange}
        />
      </QuantityInputContainer>
      <SubmitButton onClick={addCart}>
        <CartIconStyle src="/cart-icon.png" alt="" />
        ADD
      </SubmitButton>
      <Link to="/cart">cart</Link>
    </div>
  );
};

export default QuantityPicker;

const QuantityInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #e63946;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #d62828;
  }
`;

const CartIconStyle = styled.img`
  width: 20px;
`;
