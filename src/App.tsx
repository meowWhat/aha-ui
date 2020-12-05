import { Home, Login, Register, Create, NotFound } from './views'
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Progress } from './components'
import { debounce } from './utils'

function App(props: RouteComponentProps) {
  let time = useRef<NodeJS.Timeout>()
  const [flag, setFlag] = useState<boolean>(false)

  useEffect(() => {
    /* 监听路由的变化 */
    props.history.listen(() => {
      /*页面回到顶部 */
      if (document.body.scrollTop || document.documentElement.scrollTop > 0) {
        window.scrollTo(0, 0)
      }
      /* 进度条控制 */
      debounce(() => {
        setFlag(true)
        time.current = setTimeout(() => {
          setFlag(false)
          if (time.current !== undefined) {
            clearTimeout(time.current)
          }
        }, 900)
      }, 150)()
    })
  }, [props.history])

  return (
    <>
      <Switch>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        <Route path="/register" exact>
          <Register></Register>
        </Route>
        <Route path="/create" exact>
          <Create></Create>
        </Route>
        <Route path="/notFound" exact>
          <NotFound></NotFound>
        </Route>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route>
          <Redirect to="/notFound"></Redirect>
        </Route>
      </Switch>
      <Progress flag={flag} />
    </>
  )
}
export default withRouter(App)
