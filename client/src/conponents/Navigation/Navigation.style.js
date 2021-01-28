import {Menu} from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const MenuList = styled(Menu)`
  width: 100%;
  text-align: right;
  background: ${({theme}) => theme.backgroundColor.transparent};
`;
export const Item = styled(Menu.Item)`
  color : ${({theme}) => theme.color.white}
`;