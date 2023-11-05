import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import '../styles/main.css';

function CartegoryList() {
  const { categoryId } = useParams();
  const [itemInfo, setItemInfo] = useState([]);

  useEffect(() => {
    const productsUrl = `/products/${categoryId}`;
    const fetchData = async () => {
      try {
        const result = await apiClient({
          url: `${productsUrl}`,
          method: 'GET',
        });
        setItemInfo(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, [categoryId]); // categoryId 변경될 때마다 데이터 다시 가져옴

  console.log(itemInfo);

  return (
    <ProductsContainer>
      <Sidebar />
      {itemInfo && (
        <ProductsList>
          {itemInfo.map((item) => {
            return (
              <ItemCard key={item.id}>
                <LinkItemStyle to={`/items/${item.id}`}>
                  <ProductImage
                    src={`http://localhost:4000/images/${item.image}`}
                    alt={item.name}
                  />
                  <ProductInfo>
                    <ProductTitle>{item.name}</ProductTitle>
                    <ProductDescription>{item.description}</ProductDescription>
                    <ProductDescription>{item.color}</ProductDescription>
                    <ProductPrice>₩{item.price}</ProductPrice>
                  </ProductInfo>
                </LinkItemStyle>
              </ItemCard>
            );
          })}
        </ProductsList>
      )}
    </ProductsContainer>
  );
}

export default CartegoryList;

const ProductsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
`;

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const ItemCard = styled.div`
  background-color: #f1f5f1;
  border: 1px;
  border-radius: 5px;
  padding: 1rem;
  width: 220px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.03);
  }
`;

const LinkItemStyle = styled(Link)`
  text-decoration: none;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

const ProductTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const ProductDescription = styled.p`
  margin: 0;
  color: #666;
`;

const ProductPrice = styled.p`
  margin: 0;
  color: pink;
  font-weight: bold;
  font-size: 15px;
`;
