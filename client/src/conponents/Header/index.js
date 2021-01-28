import React from 'react';
import {Cols, Container, Title, Rows} from './Header.style';
import {Link} from 'react-router-dom';
import Navigation from '../Navigation';

function Header() {
  return (
    <Container>
      <Rows>
        <Cols span={6}>
          <Link to={'/'}>
            <Title children={'LOGO'}/>
          </Link>
        </Cols>
        <Cols span={18}>
          <Navigation />
        </Cols>
      </Rows>
    </Container>
  );
}

export default Header;