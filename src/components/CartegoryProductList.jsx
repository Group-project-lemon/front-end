import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import Sidebar from './Sidebar';
import '../styles/main.css';

function CartegoryProductList() {

  const { productID } = useParams();
  const [itemInfo, setItemInfo] = useState([{ id: 0, name: 'shopall' }]);


  useEffect(() => {
    const productsUrl = `/products/${productID}`;
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
  }, [productID]); // productID가 변경될 때마다 데이터 다시 가져옴

  console.log(itemInfo);

  return (
    <>
      <div>
        {itemInfo && (
          <div className="products">
            <div className="categories">
              Catergory
              <Sidebar />
            </div>
            {itemInfo.map((good) => {
              return (
                <div key={good.id}>
                  <p>
                    <Link to={`/goods/${good.id}`}>
                      <img
                        src={`/images/${good.image}`}
                        alt={`${good.name}`}
                        style={{ width: '200px', height: '150' }}
                      />
                      {good.name}+{good.description}+{good.color}+{good.price}
                    </Link>
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default CartegoryProductList;
