import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../utils/apiClient';
import '../styles/main.css';
import Sidebar from './Sidebar';
import QuantityPicker from './QuantityPicker';

function GoodContent() {
  const { goodID } = useParams();
  const [goodInfo, setItemInfo] = useState([{ id: 0, name: 'item' }]);

  useEffect(() => {
    const goodUrl = `/goods/${goodID}`;

    const fetchData = async () => {
      try {
        const result = await apiClient({
          url: `${goodUrl}`,
          method: 'GET',
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
      <div>
        {goodInfo && (
          <div className="products">
            <div className="categories">
              Catergory
              <Sidebar />
            </div>
            {goodInfo.map((good) => {
              return (
                <div key={good.id}>
                  <p>
                    <img
                      src={`/images/${good.image}`}
                      alt={`${good.name}`}
                      style={{ width: '200px', height: '150' }}
                    />
                    {good.name}+{good.description}+{good.color}+{good.price}
                    <QuantityPicker itemValue={`${good.id}`} />
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

export default GoodContent;
