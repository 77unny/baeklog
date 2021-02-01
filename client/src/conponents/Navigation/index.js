import React, {useCallback, useEffect, useState} from 'react';
import {Container, MenuList, Item} from './Navigation.style';
import LoginModal from '../LoginModal';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT_REQUEST} from '../../redux/types';
import RegisterModal from '../RegisterModal';
import {Link} from 'react-router-dom';

const commonMenuList = [
  {
    id   : 1,
    key  : 'Home',
    name : 'Home',
    path : '/',
    exact: true
  },
  {
    id   : 2,
    key  : 'Posts',
    name : 'Posts',
    path : '/Posts',
    exact: true
  }
]

const memberMenuList = [
  {
    id   : 1,
    key  : '회원메뉴1',
    name : '회원메뉴1',
    path : '#',
    exact: true
  },
  {
    id   : 2,
    key  : '회원메뉴2',
    name : '회원메뉴2',
    path : '#',
    exact: true
  },
  {
    id   : 3,
    key  : '회원메뉴3',
    name : '회원메뉴3',
    path : '#',
    exact: true
  }
];

const guestMenuList = [
  {
    id   : 1,
    key  : '게스트메뉴1',
    name : '게스트메뉴1',
    path : '#',
    exact: true
  },
  {
    id   : 2,
    key  : '게스트메뉴2',
    name : '게스트메뉴2',
    path : '#',
    exact: true
  },
  {
    id   : 3,
    key  : '게스트메뉴3',
    name : '게스트메뉴3',
    path : '#',
    exact: true
  }
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const {isAuthenticated, user, userRole} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST
    });
  }, [dispatch]);
  const onClick = e => console.log(e);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log('[LOGIN STATE]', isAuthenticated);
    setIsOpen(false);
  }, [user]);

  return (
    <Container>
      <MenuList mode="horizontal" onClick={onClick}>
        {commonMenuList.map(menu => <Item key={menu.key}><Link to={menu.path}>{menu.name}</Link></Item>)}
        {isAuthenticated ?
          memberMenuList.map(menu => <Item key={menu.key}><Link to={menu.path}>{menu.name}</Link></Item>) :
          guestMenuList.map(menu => <Item key={menu.key}><Link to={menu.path}>{menu.name}</Link></Item>)}
      </MenuList>
      {isAuthenticated ? <p onClick={onLogout}>로그아웃</p> : <LoginModal/>}
      <RegisterModal/>
    </Container>
  );
}

export default Navigation;