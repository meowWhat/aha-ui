import './Home.less'
import {
  withRouter,
  NavLink,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'
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
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { IMState } from 'src/states/IMState'
import { useValidate } from 'src/hooks'
const Linkman = lazy(() => import('./Linkman/Linkman'))
const Message = lazy(() => import('./Message/Message'))
const Find = lazy(() => import('./Find/Find'))
const Profile = lazy(() => import('./Profile/Profile'))

interface HomeProps extends RouteComponentProps {
  imState: IMState
}
const Home = observer(({ imState, history }: HomeProps) => {
  const { loginFlag } = useValidate(imState)

  return (
    <div id="home">
      <header className="home-nav bgc-gray">
        <span className="home-nav-title">
          aha
          <span
            className={classNames('home-nav-status', {
              offLine: !imState.isOnline,
            })}
          ></span>
        </span>
        <span></span>
        <span className="home-nav-icon">
          <SearchOutlined />
        </span>
        <span
          className="home-nav-icon"
          onClick={() => {
            history.push('/user/friendAdder')
          }}
        >
          <PlusCircleOutlined />
        </span>
      </header>

      <section className="home-content">
        {loginFlag ? (
          <Suspense
            fallback={<ActivityIndicator size="large" text="正在加载" toast />}
          >
            <Switch>
              <Route path="/home/message" exact>
                <Message imState={imState} />
              </Route>
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
        ) : (
          <ActivityIndicator text="loading...." />
        )}
      </section>
      <div className="home-tabbar bgc-gray">
        <NavLink
          activeClassName="green"
          to="/home/message"
          className="home-tabbar-item"
        >
          <CommentOutlined />
          <span>消息</span>
        </NavLink>
        <NavLink
          activeClassName="green"
          to="/home/linkman"
          className="home-tabbar-item"
        >
          <UsergroupAddOutlined />
          <span>通讯录</span>
        </NavLink>
        <NavLink
          activeClassName="green"
          to="/home/find"
          className="home-tabbar-item"
        >
          <CompassOutlined />
          <span>发现</span>
        </NavLink>
        <NavLink
          activeClassName="green"
          to="/home/profile"
          className="home-tabbar-item"
        >
          <UserOutlined />
          <span>我</span>
        </NavLink>
      </div>
    </div>
  )
})

export default withRouter(Home)
