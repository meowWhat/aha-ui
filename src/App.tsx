import { Home, Login, Register, Create } from './views'
import { Redirect, Route, Switch } from 'react-router-dom'

export default function App() {
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
        <Route path="/register/:email" exact>
          <Register></Register>
        </Route>
        <Route path="/create/:email" exact>
          <Create></Create>
        </Route>
        <Route path="/" exact>
          <Redirect to="/login"></Redirect>
        </Route>
        <Route>
          <Redirect to="/notFound"></Redirect>
        </Route>
      </Switch>
    </>
  )
}
