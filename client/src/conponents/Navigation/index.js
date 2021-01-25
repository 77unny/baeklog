import React from 'react';
import {Container, MenuList, Item} from './Navigation.style';

function Navigation({menuList}) {
  const onClick = e => console.log(e);

  return (
    <Container>
      <MenuList mode="horizontal" onClick={onClick}>
        {menuList && menuList.map(menu => <Item key={menu.key}>{menu.name}</Item>)}
      </MenuList>
    </Container>
  );
}

export default Navigation;