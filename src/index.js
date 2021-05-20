import React from 'react'
import ReactDOM from 'react-dom'

// global css
import '@scss/index.scss'
// components
import App from './components/app/App'

const Root = document.querySelector('#root')
ReactDOM.render(<App />, Root)
