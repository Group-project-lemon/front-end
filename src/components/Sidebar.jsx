import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Sidebar() {
  return (
    <>
      <NaviStyle>
        <Orderlists>
          Category
          <hr />
          <LiStyle>
            <Listitems to="/">shop all</Listitems>
          </LiStyle>
          <LiStyle>
            <Listitems to="/products/bag">bags</Listitems>
          </LiStyle>
          <LiStyle>
            <Listitems to="/products/footwear">footwear</Listitems>
          </LiStyle>
          <LiStyle>
            <Listitems to="/products/accessories">accessories</Listitems>
          </LiStyle>
        </Orderlists>
      </NaviStyle>
    </>
  );
}

const Orderlists = styled.ul`
  list-style-type: none;
`;

const Listitems = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: #acabab;
    transition: all 100ms ease-in-out;
  }
`;

const NaviStyle = styled.nav``;

const LiStyle = styled.li`
  margin: 8px;
`;
