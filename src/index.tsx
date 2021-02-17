import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'
import App from 'src/App'
import { ErrorBoundary } from './components'
import { BrowserRouter } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <LazyLoad>
        <App />
      </LazyLoad>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
)
