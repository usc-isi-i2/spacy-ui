import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "./index.css" //Set the global parameters here. fonts etc. 

/*
  We use the router to map the url to serverName, project name and field name. 
*/
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/" component={App}/>
      {/* add the new route */}
      <Route path=":auth/:serverName/:projectName/:fieldName" component={App}/>
    </Route>
  </Router>
), document.getElementById('root'))


registerServiceWorker();
