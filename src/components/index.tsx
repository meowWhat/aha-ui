import { lazy } from 'react'
import Progress from './Progress/Loading'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Emoji from './Emoji/Emoji'
import { UserInfoProps } from './UserInfo/UserInfo'
import { ring } from './Ring/Ring'

const Item = lazy(() => import('./Item/Item'))
const MsgBox = lazy(() => import('./MsgBox/MsgBox'))
const UserInfo = lazy(() => import('./UserInfo/UserInfo'))

export { Progress, Item, MsgBox, ErrorBoundary, Emoji, UserInfo, ring }

export type { UserInfoProps }
