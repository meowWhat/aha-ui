import React from 'react'
import ReactDOM from 'react-dom'

import 'antd-mobile/dist/antd-mobile.css'
import { Button } from 'antd-mobile'
import 'src/index.less'

const App = () => {
  return (
    <div>
      <Button type="warning">defaulst</Button>
      <p>aaaaa</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
)
