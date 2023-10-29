import { useEffect, useState } from 'react';
import MainBar from '../components/MainBar';
import Footer from '../components/Footer';
import { apiClient } from '../utils/apiClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [itemInfo, setItemInfo] = useState([]);

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

  return (
    <>
      <MainBar />
      <Container>
        {itemInfo.map((item) => (
          <CartItem key={item.id} onClick={() => moveItemPage(item.id)}>
            <ItemImg
              src={`http://localhost:4000/images/${item.image}`}
              alt={item.name}
            />
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemDescription>{item.description}</ItemDescription>
              <ItemDetails>Color: {item.color}</ItemDetails>
              <ItemPrice>${item.price}</ItemPrice>
              <Quantity>Quantity: {item.quantity}</Quantity>
            </ItemInfo>
          </CartItem>
        ))}
        <OrderButtonWrapper>
          <SubmitButton onClick={order}>ORDER</SubmitButton>
        </OrderButtonWrapper>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  padding: 20px 0;

  &:hover {
    background-color: #f5f5f5; /* Background color for hover effect */
    transform: translateY(-5px); /* Lifts the card up a little */
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1); /* Gives the card a subtle shadow */
  }
`;

const ItemImg = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 20px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
`;

const ItemName = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
`;

const ItemDescription = styled.p`
  color: #777;
  margin-bottom: 5px;
`;

const ItemDetails = styled.span`
  margin-bottom: 10px;
  color: #555;
`;

const ItemPrice = styled.span`
  font-weight: bold;
  color: #333;
`;

const Quantity = styled.span`
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
`;

const OrderButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default CartPage;
