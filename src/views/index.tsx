import { lazy } from 'react'

const Home = lazy(() => import('./Home/Home'))
const Login = lazy(() => import('./Login/Login'))
const Register = lazy(() => import('./Register/Register'))
const Create = lazy(() => import('./Create/Create'))
const NotFound = lazy(() => import('./NotFound/NotFound'))
const User = lazy(() => import('./User/User'))
export { Home, Login, Register, Create, User, NotFound }
