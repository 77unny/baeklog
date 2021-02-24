import React from 'react';
import {Layout} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
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
          <Route path={'/posts'} component={PostList}/>
          <Route path={'/post/:id'} component={PostDetail}/>
          <Route path={'/write'} component={PostWrite}/>
          <Route path={'/search:keyword'} component={Search}/>
          <Redirect from={'*'} to={'/'}/>
        </Switch>
      </Content>
      <Footer/>
      </Router>
    </Layout>
  );
}

export default Routers;