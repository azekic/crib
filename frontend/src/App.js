import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import CommentsPage from './pages/Comments';
import PostsPage from './pages/Posts';
import MainNavigation from './components/Navigation/MainNavigation';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
          <Redirect from = "/" to="/auth" exact />
            <Route path = "/auth" component = {AuthPage}/>
            <Route path = "/posts" component = {PostsPage}/>
            <Route path = "/comments" component = {CommentsPage}/>
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
