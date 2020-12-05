import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'
import App from 'src/App'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
)
