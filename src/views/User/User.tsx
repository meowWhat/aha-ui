import './User.less'
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { ActivityIndicator } from 'antd-mobile'
import { lazy, Suspense } from 'react'
import { useState } from 'react'
import { imState } from 'src/states/IMState'

const Conversation = lazy(() => import('./Conversation/Conversation'))
const Profile = lazy(() => import('./Profile/Profile'))
const FriendAdder = lazy(() => import('./FriendAdder/FriendAdder'))

const User = (props: RouteComponentProps) => {
  const [title, setTitle] = useState('')
  return (
    <div id="user">
      <header className="user-nav bgc-gray">
        <span
          className="user-nav-title"
          onClick={() => {
            props.history.goBack()
          }}
        >
          <LeftOutlined />
        </span>
        <span>{title}</span>
      </header>

      <section className="user-content">
        <Suspense
          fallback={<ActivityIndicator size="large" text="正在加载" toast />}
        >
          <Switch>
            <Route path="/user/conversation" exact>
              <Conversation
                onLoad={(nickName) => {
                  setTitle(nickName)
                }}
                imState={imState}
              />
            </Route>
            <Route path="/user/profile" exact component={Profile} />
            <Route path="/user/friendAdder" exact>
              <FriendAdder
                onLoad={(title) => {
                  setTitle(title)
                }}
                imState={imState}
              />
            </Route>
            <Route>
              <Redirect to="/notFound"></Redirect>
            </Route>
          </Switch>
        </Suspense>
      </section>
    </div>
  )
}

export default withRouter(User)
