import React from 'react'
import ReactDOM from 'react-dom'
// import { autorun, observable } from 'mobx'

import App from './js/App'
import store from './js/App-Store'
import './css/index.css'


ReactDOM.render(
  <App store={ store } />,
  document.getElementById('root')
)