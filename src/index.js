import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import StoreProvider from './store/store'
import 'mobx-react-lite/batchingForReactDom'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
