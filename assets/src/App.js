import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//components
import Header from './components/Header';
import Homepage from './components/Homepage';
import Livepage from './components/Livepage';
import Page404 from './components/404page';
//import Listpage from './components/List';

class App extends Component {
  render() {
    console.log('ccc..');
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/canli-yayin" component={Livepage} />
            <Route path="*" component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;