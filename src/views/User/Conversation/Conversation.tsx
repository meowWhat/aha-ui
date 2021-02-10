import { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
interface ConversationProps {
  onLoad: (nickName: string) => void
}

export interface ConversationLocation {
  id: string
  nickName: string
}

const Conversation = (props: ConversationProps & RouteComponentProps) => {
  const { onLoad } = props
  const { id, nickName } = props.history.location.state as ConversationLocation
  useEffect(() => {
    onLoad(nickName)
    return () => {
      onLoad('')
    }
  }, [onLoad, nickName])
  return <div>conversation {id}</div>
}

export default withRouter(Conversation)
