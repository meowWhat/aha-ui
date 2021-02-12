import { lazy } from 'react'
import Progress from './Progress/Loading'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
const Item = lazy(() => import('./Item/Item'))
const MsgBox = lazy(() => import('./MsgBox/MsgBox'))

export { Progress, Item, MsgBox, ErrorBoundary }
