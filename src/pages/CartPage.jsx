import { useEffect, useState } from 'react';
import MainBar from '../components/MainBar';
import Footer from '../components/Footer';
import { apiClient } from '../utils/apiClient';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [itemInfo, setItemInfo] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const pricetotal = subtotal + delivery;
    setTotal(pricetotal);
  }, [subtotal, delivery]);

  useEffect(() => {
    let calculatedTotalSubtotal = 0;

    itemInfo.forEach((item) => {
      const subtotalForItem = item.price * item.quantity;
      calculatedTotalSubtotal += subtotalForItem;
    });

    setSubtotal(calculatedTotalSubtotal);
  }, [itemInfo]);

  useEffect(() => {
    let calculatedTotalSubtotal = 0;

    // Calculate total subtotal for all items
    itemInfo.forEach((item) => {
      calculatedTotalSubtotal += item.price * item.quantity;
    });

    // Set delivery fee based on the total subtotal
    if (calculatedTotalSubtotal > 50000) {
      setDelivery(0); // Free delivery if total is over 50000
    } else {
      setDelivery(5000); // Charge 5000 for delivery
    }
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

  return (
    <>
      <MainBar />
      <ContentContainer>
        <Container>
          <FontStyle>
            My Cart
            <hr />
          </FontStyle>
          {itemInfo.map((item) => {
            return (
              <CartItem key={item.id}>
                <ItemImg
                  src={`http://localhost:4000/images/${item.image}`}
                  alt={item.name}
                  onClick={() => moveItemPage(item.id)}
                />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                  <ItemDetails>Color: {item.color}</ItemDetails>
                  <ItemPrice>₩{item.price}</ItemPrice>
                  <Quantity>Quantity: {item.quantity}</Quantity>
                </ItemInfo>
                <RemoveItemBtn>&times;</RemoveItemBtn>
              </CartItem>
            );
          })}
          <OrderButtonWrapper></OrderButtonWrapper>
        </Container>
        <SummaryContainer>
          <FontStyle>
            Order summary <hr />
          </FontStyle>
          <SubtotalStyle>
            <TextStyle>subtotal ₩{subtotal}</TextStyle>
            <TextStyle>delivery ₩{delivery}</TextStyle>
          </SubtotalStyle>
          <hr />
          {/* <button onClick={totalPrice}>check how much</button> */}
          <TotalStyle>Total ₩{total}</TotalStyle>
          <SubmitButton onClick={order}>CHECKOUT</SubmitButton>
        </SummaryContainer>
      </ContentContainer>
      <Footer />
    </>
  );
};

const ContentContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  padding: 20px;
  width: 630px;
  margin-left: 100px;
`;

const FontStyle = styled.div`
  font-size: 25px;
`;

const SummaryContainer = styled.div`
  padding: 20px;
  width: 250px;
`;

const CartItem = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  padding: 20px 0px;
`;

const ItemImg = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 20px;
  object-fit: cover;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  background-color: #d2973c;
  width: 250px;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const SubtotalStyle = styled.div`
  margin: 0 auto;
`;

const TextStyle = styled.div`
  margin: 30px 0;
`;

const TotalStyle = styled.div`
  font-size: 23px;
  margin: 30px 0;
`;

const RemoveItemBtn = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 30px;
  margin-right: 40px;
  background-color: white;
`;

export default CartPage;
