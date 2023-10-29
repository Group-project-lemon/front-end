import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import '../styles/main.css';
import QuantityPicker from './QuantityPicker';

function ItemContent() {
  const { itemId } = useParams();
  const [itemInfo, setItemInfo] = useState([{ id: 0, name: 'item' }]);

  useEffect(() => {
    const itemUrl = `/items/${itemId}`;

    const fetchData = async () => {
      try {
        const result = await apiClient({ url: `${itemUrl}` });
        setItemInfo(result);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        {itemInfo && (
          <div className="products">
            <div>
              <ul>
                <li>
                  <button>shop all-sidebar</button>
                </li>
              </ul>
            </div>
            {itemInfo.map((item) => {
              return (
                <div key={item.id}>
                  <p>
                    <img
                      src={`/images/${item.image}`}
                      alt={`${item.name}`}
                      style={{ width: '200px', height: '150' }}
                    />
                    {item.name}+{item.description}+{item.color}+{item.price}
                    <QuantityPicker itemValue={`${item.id}`} />
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

export default ItemContent;
