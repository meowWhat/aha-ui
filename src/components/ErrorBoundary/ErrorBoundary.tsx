import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

class ErrorBoundary extends React.Component<RouteComponentProps> {
  componentDidCatch() {
    // 抓取错误,跳转至首页
    this.props.history.push('/notFound')
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
