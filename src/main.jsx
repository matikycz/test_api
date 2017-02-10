/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, DefaultRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
/* eslint-enable no-unused-vars */

import { configureStore } from './configureStore'
import App from './App.jsx'

/* eslint-disable no-undef */
require('./sass/styles.scss')
/* eslint-enable no-undef */

/*
 * Combinde main reducers
 */
const reducer = combineReducers({
    routing: routerReducer,
    session: combineReducers({
        headers: (state= {}, action) => state
    })
})

/*
 * Configure store
 */
const store = configureStore(reducer)

import apiConfiguration from './api/configureApi'

apiConfiguration.configureApi(store)

apiConfiguration.api({
    path: 'http://localhost:3000/api/v1/auth/sign_in',
    method: 'POST',
    entity: {
         email: "admin@localhost.pl",
         login: "admin",
         password: "adminadmin"
    }
}).then(response => console.log(response))
/*
 * Configure history for Router
 */
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path='/'>
          <IndexRoute component={App}/>
        </Route>
      </Router>
    </Provider>
), document.getElementById('root'))
