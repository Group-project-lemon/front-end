import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';

const QuantityPicker = (item) => {
  const [formData, setFormData] = useState({
    itemsId: Number(item.itemValue),
    quantity: 1,
  });

  const navigate = useNavigate();
  const [itemInfo, setItemInfo] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  const handleQuantityChange = (event) => {
    const enteredQuantity = parseInt(event.target.value, 10) || 1;

    setFormData({
      ...formData,
      quantity: Math.max(1, enteredQuantity),
    });
  };

  useEffect(() => {
    let calculatedTotalSubtotal = 0;

    itemInfo.forEach((item) => {
      const subtotalForItem = item.price * item.quantity;
      calculatedTotalSubtotal += subtotalForItem;
    });

    setSubtotal(calculatedTotalSubtotal);
  }, [itemInfo]);

  useEffect(() => {
    const url = `/carts`;

    const fetchData = async () => {
      try {
        const result = await apiClient({ url: `${url}` });
        setItemInfo(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  const order = async () => {
    alert('기능 준비중입니다.');
  };

  const moveItemPage = (id) => {
    navigate(`/items/${id}`);
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
        setIsCartOpen(!isCartOpen); // Toggle the side cart
      } else {
        alert(
          '로그인을 하지 않아 카트에 담지 못했습니다. 로그인 후 이용바랍니다.',
        );
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
      {/* <CartBtnStyle to="/cart">CART</CartBtnStyle> */}
      <div className="body">
        <div className={`sideCart ${isCartOpen ? 'open' : ''}`}>
          <div className="cart_content">
            <div className="cart_header">
              <img src="/cart-icon.png" alt="Cart Icon" style={{ width: 30 }} />
              <div className="header_title">
                <h2>CART</h2>
              </div>
              <span
                id="close_btn"
                className="close_btn"
                onClick={() => setIsCartOpen(false)}
              >
                &times;
              </span>
            </div>
            {/* Cart Items */}
            <div className="cart_items">
              {/* Item 1 */}
              {itemInfo.map((item) => (
                <div
                  className="cart_item"
                  key={item.id}
                  onClick={() => moveItemPage(item.id)}
                >
                  <div className="remove_item">
                    <span>&times;</span>
                  </div>
                  <div className="item_img">
                    <img
                      src={`http://localhost:4000/images/${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="item_details">
                    <p>{item.name}</p>
                    <strong>{item.price}</strong>
                    <div className="qty">
                      <span>-</span>
                      <strong>{item.quantity}</strong>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Cart Actions */}
            <div className="cart_actions">
              <div className="subtotal">
                <p>SUBTOTAL :</p>
                <p>
                  <span id="subtotal_price">{subtotal}</span>
                </p>
              </div>
              <Link to="/cart">View Cart</Link>
              <button onClick={order}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
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
  background-color: #d2973c;
  color: white;
  padding: 10px 36px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const CartIconStyle = styled.img`
  width: 20px;
  margin-right: 10px;
`;

// const CartBtnStyle = styled(Link)`
//   margin-left: 10px;
//   text-decoration: none;
//   background-color: #d2973c;
//   color: white;
//   padding: 10px 30px;
//   font-size: 18px;
//   border: none;
//   border-radius: 5px;
//   transition: background-color 0.3s ease;
//   margin-top: 1rem;

//   &:hover {
//     opacity: 0.9;
//   }
// `;
