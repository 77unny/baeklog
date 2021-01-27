import React, {useCallback, useEffect, useState} from 'react';
import {Container, MenuList, Item} from './Navigation.style';
import LoginModal from '../LoginModal';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT_REQUEST} from '../../redux/types';
import RegisterModal from '../RegisterModal';

function Navigation({menuList}) {
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
    console.log(isAuthenticated)
    setIsOpen(false);
  }, [user]);

  return (
    <Container>
      <MenuList mode="horizontal" onClick={onClick}>
        {menuList && menuList.map(menu => <Item key={menu.key}>{menu.name}</Item>)}
      </MenuList>
      {isAuthenticated ? <p onClick={onLogout}>로그아웃</p> : <LoginModal/>}
      <RegisterModal />
    </Container>
  );
}

export default Navigation;