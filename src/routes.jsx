import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import main from './containers/mainView';

const recorderWorker = require('recorderjs/recorderWorker.js');
const browserHistory = useRouterHistory(createHistory)({ basename: '/' });

export default (
  <Router history={browserHistory}>
    <Route path="/" component={main}>
      <IndexRoute component={main}/>
      <Route path="/main" component={main}/>
      <Route path="/recorderWorker.js" render={() => recorderWorker}/>
    </Route>
  </Router>
);
