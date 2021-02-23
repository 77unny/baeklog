import styled from 'styled-components';
import {Layout} from 'antd';

const {Footer} = Layout;

export const Container = styled(Footer)`
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: ${({theme}) => theme.color.gray};
  text-align: center;
  background: ${({theme}) => theme.backgroundColor.gray};
`
