import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import { Router } from 'react-router-dom'
import history from './history';
import 'typeface-roboto'
import './index.css'
import App from './App/App'
import { ErrorBoundary } from './Errors/ErrorBoundary';

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)



ReactDOM.render(
  <Router history={history}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>,
  document.getElementById('root')
)
