import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const MenuList = styled(Menu)`
  width: 100%;
  text-align: right;
  background: ${({theme}) => theme.backgroundColor.transparent};
  .ant-menu-item a { 
    color : ${({theme}) => theme.color.white};
  }
`;

export const Item = styled(Menu.Item)``;

export const ItemLink = styled(Link)``;