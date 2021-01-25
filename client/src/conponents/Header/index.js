import React from 'react';
import {Cols, Container, Title, Rows} from './Header.style';
import {Link} from 'react-router-dom';
import Navigation from '../Navigation';

const memberMenu = [
  {
    id  : 1,
    key : '회원메뉴1',
    name: '회원메뉴1',
    link: '#'
  },
  {
    id  : 2,
    key : '회원메뉴2',
    name: '회원메뉴2',
    link: '#'
  },
  {
    id  : 3,
    key : '회원메뉴3',
    name: '회원메뉴3',
    link: '#'
  }
];

const guestMenu = [
  {
    id  : 1,
    key : '게스트메뉴1',
    name: '게스트메뉴1',
    link: '#'
  },
  {
    id  : 2,
    key : '게스트메뉴2',
    name: '게스트메뉴2',
    link: '#'
  },
  {
    id  : 3,
    key : '게스트메뉴3',
    name: '게스트메뉴3',
    link: '#'
  }
];

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
          <Navigation menuList={true ? memberMenu : guestMenu}/>
        </Cols>
      </Rows>
    </Container>
  );
}

export default Header;