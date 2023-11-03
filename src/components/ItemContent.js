import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import '../styles/main.css';
import QuantityPicker from './QuantityPicker';

function ItemContent() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const itemUrl = `/items/${itemId}`;

    const fetchData = async () => {
      try {
        const result = await apiClient({ url: `${itemUrl}` });
        setItem(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <ProductDetail key={item.id}>
          {item.image && (
            <ImageContainer>
              <Image
                src={`http://localhost:4000/images/${item.image}`}
                alt={item.name}
              />
            </ImageContainer>
          )}
          <Info>
            <Name>{item.name}</Name>
            <Description>{item.description}</Description>
            <Color>Color: {item.color}</Color>
            <Price>${item.price}</Price>

            <QuantityPicker itemValue={item.id} />
          </Info>
        </ProductDetail>
        <div className="body">
          {/* useState이용해서 add눌리면 open 하는걸로 
          함수 만들자 */}
          <div className="sideCart open">
            <div className="cart_content">
              <div className="cart_header">
                <img
                  src="/cart-icon.png"
                  alt="Cart Icon"
                  style={{ width: 30 }}
                />
                <div className="header_title">
                  <h2>Cart</h2>
                  <span id="items_num">4</span>
                </div>
                <span id="close_btn" className="close_btn">
                  &times;
                </span>
              </div>
              {/* Cart Items */}
              <div className="cart_items">
                {/* Item 1 */}
                <div className="cart_item">
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
                      <strong>1</strong>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cart Actions */}
              <div className="cart_actions">
                <div className="subtotal">
                  <p>SUBTOTAL :</p>
                  <p>
                    $<span id="subtotal_price">3896</span>
                  </p>
                </div>
                <Link to="/cart">View Cart</Link>
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ItemContent;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: #f5f5f5;
`;

const ProductDetail = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Name = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
`;

const Color = styled.span`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #e63946;
  margin-bottom: 20px;
`;
