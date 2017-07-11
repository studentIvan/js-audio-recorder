import React from 'react';
import ReactDOM from 'react-dom';

import './styles/theme.css';
import './styles/style.scss';

import { Provider } from 'react-redux';

import Reducers from './reducers';
import { createStore } from 'redux';
import { Router, hashHistory } from 'react-router';

import Routes from './routes';

ReactDOM.render(
    <Provider store={createStore(Reducers) }>
        <Router history={hashHistory} routes={Routes}/>
    </Provider>,
    document.getElementById('root')
);
