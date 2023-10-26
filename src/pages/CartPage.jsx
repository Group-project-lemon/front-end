import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MainBar from '../components/MainBar';
import Footer from '../components/Footer';
import { apiClient } from '../utils/apiClient';
import styled from 'styled-components';

const CartPage = () => {
  const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  `;

  const [searchParams] = useSearchParams();
  const queryItemId = searchParams.get('itemId');
  const queryItemQuantity = searchParams.get('itemQuantity');

  console.log(queryItemId);
  console.log(queryItemQuantity);

  const itemId = queryItemId;
  const [itemInfo, setItemInfo] = useState([{ id: 0, name: 'item' }]);

  useEffect(() => {
    const itemUrl = `/items/${itemId}`;

    const fetchData = async () => {
      try {
        const result = await apiClient({ 
          url: `${itemUrl}`
        });
        setItemInfo(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MainBar />
      <div>
        {itemInfo.map((item) => {
          return (
            <div key={item.id}>
              <p>
                <img
                  src={`/images/${item.image}`}
                  alt={`${item.name}`}
                  style={{ width: '200px', height: '150' }}
                />
                {item.name}+{item.description}+{item.color}+{item.price}+
                {queryItemQuantity}
              </p>
            </div>
          );
        })}
      </div>
      <Link to={`/delivery`}>
        {/*cartId를 쿼리 값으로 넣어서 delivery페이지 만들기 */}
        <SubmitButton>ORDER</SubmitButton>
      </Link>
      <Footer />
    </>
  );
};

export default CartPage;
