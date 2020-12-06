import './Home.less'
import { withRouter, NavLink, Route, Switch, Redirect } from 'react-router-dom'
import {
  CommentOutlined,
  UsergroupAddOutlined,
  CompassOutlined,
  UserOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { ActivityIndicator } from 'antd-mobile'
import { lazy, Suspense } from 'react'

const Linkman = lazy(() => import('./Linkman/Linkman'))
const Message = lazy(() => import('./Message/Message'))
const Find = lazy(() => import('./Find/Find'))
const Profile = lazy(() => import('./Profile/Profile'))

const Home = () => {
  return (
    <div id="home">
      <header className="home-nav bgc-gray">
        <span className="home-nav-title">aha</span>
        <span></span>
        <span className="home-nav-icon">
          <SearchOutlined />
        </span>
        <span className="home-nav-icon">
          <PlusCircleOutlined />
        </span>
      </header>

      <section className="home-content">
        <Suspense fallback={<ActivityIndicator size="large" text="正在加载" toast />}>
          <Switch>
            <Route path="/home/message" exact component={Message} />
            <Route path="/home/linkman" exact component={Linkman} />
            <Route path="/home/find" exact component={Find} />
            <Route path="/home/profile" exact component={Profile} />

            <Route path="/home" exact>
              <Redirect to="/home/message"></Redirect>
            </Route>
            <Route>
              <Redirect to="/notFound"></Redirect>
            </Route>
          </Switch>
        </Suspense>
      </section>

      <div className="home-tabbar bgc-gray">
        <NavLink activeClassName="green" to="/home/message" className="home-tabbar-item">
          <CommentOutlined />
          <span>消息</span>
        </NavLink>
        <NavLink activeClassName="green" to="/home/linkman" className="home-tabbar-item">
          <UsergroupAddOutlined />
          <span>通讯录</span>
        </NavLink>
        <NavLink activeClassName="green" to="/home/find" className="home-tabbar-item">
          <CompassOutlined />
          <span>发现</span>
        </NavLink>
        <NavLink activeClassName="green" to="/home/profile" className="home-tabbar-item">
          <UserOutlined />
          <span>我</span>
        </NavLink>
      </div>
    </div>
  )
}

export default withRouter(Home)
