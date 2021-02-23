import styled from 'styled-components';
import {Col, Layout, Row} from 'antd';

const {Header} = Layout;

export const Container = styled(Header)`
  color: ${({theme}) => theme.color.white};;
  background: ${({theme}) => theme.backgroundColor.black};
`;
export const Title = styled.h1`
  color: ${({theme}) => theme.color.white};
`;
export const Rows = styled(Row)``;
export const Cols = styled(Col)``;