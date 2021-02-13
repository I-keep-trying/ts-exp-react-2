import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import { reducer, StateProvider } from './state'

import App from './App'

const title: string = 'Typescript app'

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App title={title} />
  </StateProvider>,
  document.getElementById('main')
)
