import { lazy } from 'react'
import Progress from './Progress/Loading'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Emoji from './Emoji/Emoji'
import { UserInfoProps } from './UserInfo/UserInfo'
import { ring } from './Ring/Ring'
import { RenderVoip } from './Voip/Voip'
import VoipToolItem from './VoipToolItem/VoipToolItem'

const Item = lazy(() => import('./Item/Item'))
const MsgBox = lazy(() => import('./MsgBox/MsgBox'))
const UserInfo = lazy(() => import('./UserInfo/UserInfo'))

export {
  Progress,
  Item,
  MsgBox,
  ErrorBoundary,
  Emoji,
  UserInfo,
  ring,
  VoipToolItem,
  RenderVoip
}

export type { UserInfoProps }
