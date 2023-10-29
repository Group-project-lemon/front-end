import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import Sidebar from './Sidebar';
import '../styles/main.css';

function ProductList() {

  const [itemInfo, setItemInfo] = useState([{ id: 0, name: 'shopall' }]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const result = apiClient({ 
          url: '/cart',
          method: 'GET',
        });
        setItemInfo(result);
        console.log(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);
  const itemsListInCart = []
  console.log(itemInfo);
  try {
    const result = apiClient({ 
      url: `/goods/${itemInfo[0].items_id}`,
      method: 'GET',
    });
    const quantityNumber = `${itemInfo[0].quantity}`;
    console.log(quantityNumber);
    itemsListInCart[0] = result.push({quantity:`${quantityNumber}`});
    console.log(itemsListInCart[0]);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다.');
  }
  
  // const itemsListInCart = []
  // for (let i = 0; i < itemInfo.length; i++) {
  //   try {
  //     const result = apiClient({ 
  //       url: `/goods/${itemInfo[i].items_id}`,
  //       method: 'GET',
  //     });
  //     const quantityNumber = `${itemInfo[i].quantity}`;
  //     console.log(quantityNumber);
  //     itemsListInCart[i] = result.push({quantity:`${quantityNumber}`});
  //     console.log(itemsListInCart[i]);
  //   } catch (error) {
  //     console.error('데이터를 가져오는 중 오류가 발생했습니다.');
  //   }
  // }
  // console.log(itemInfo);
  // console.log(itemsListInCart);

  return (
    <>
      <div>
        {itemInfo && (
          <div className="products">
            <div className="categories">
              Catergory
              <Sidebar />
            </div>
            {itemsListInCart.map((good) => {
              return (
                <div key={good.id}>
                  <p>
                    <Link to={`/goods/${good.id}`}>
                      <img
                        src={`/images/${good.image}`}
                        alt={`${good.name}`}
                        style={{ width: '200px', height: '150' }}
                      />
                      {good.name}+{good.description}+{good.color}+{good.price}+{good.quantity}
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

export default ProductList;
