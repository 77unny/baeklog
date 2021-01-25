import React from 'react';
import Header from '../conponents/Header';
import Footer from '../conponents/Footer';
import {Layout} from 'antd';

function Routers(props) {
  return (
    <Layout>
      <Header/>
      <Footer/>
    </Layout>
  );
}

export default Routers;