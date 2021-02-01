import React from 'react';
import {Layout} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from '../conponents/Header';
import Footer from '../conponents/Footer';
import Home from './Home';
import PostList from './PostList';
import PostWrite from './PostWrite';
import PostDetail from './PostDetail';
import Search from './Search';

const {Content} = Layout;

function Routers(props) {
  return (
    <Layout>
      <Router>
      <Header/>
      <Content>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/posts'} exact component={PostList}/>
          <Route path={'/posts:id'} exact component={PostDetail}/>
          <Route path={'/posts/'} exact component={PostDetail}/>
          <Route path={'/write'} exact component={PostWrite}/>
          <Route path={'/search:keyword'} exact component={Search}/>
          <Redirect from={'*'} to={'/'}/>
        </Switch>
      </Content>
      <Footer/>
      </Router>
    </Layout>
  );
}

export default Routers;