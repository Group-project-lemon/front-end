import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import '../styles/main.css';
import styled from 'styled-components';

export default function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await apiClient({ url: '/items' });
      setItems(result);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  return (
    <ProductsContainer>
      <ProductsList>
        {items.map((item) => (
          <ItemCard key={item.id}>
            <Link to={`/items/${item.id}`}>
              {item && item.image && (
                <ProductImage
                  src={`http://localhost:4000/images/${item.image}`}
                  alt={item.name}
                />
              )}
              <ProductInfo>
                <ProductTitle>{item.name}</ProductTitle>
                <ProductDescription>{item.description}</ProductDescription>
                <ProductDescription>{item.color}</ProductDescription>
                <ProductDescription>{item.price}</ProductDescription>
              </ProductInfo>
            </Link>
          </ItemCard>
        ))}
      </ProductsList>
    </ProductsContainer>
  );
}

const ProductsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem;
`;

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const ItemCard = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 1rem;
  width: 220px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.03);
  }
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
`;

const ProductTitle = styled.h3`
  margin: 0;
  color: #333;
`;

const ProductDescription = styled.p`
  margin: 0;
  color: #666;
`;
