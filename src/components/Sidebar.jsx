import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <>
      <nav>
        <ul className="orderlists">
          Category
          <li>
            <Link to="/" className="listitems">
              shop all
            </Link>
          </li>
          <li>
            <Link to="/products/bag" className="listitems">
              bags
            </Link>
          </li>
          <li>
            <Link to="/products/footwear" className="listitems">
              footwear
            </Link>
          </li>
          <li>
            <Link to="/products/accessories" className="listitems">
              accessories
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
