import { observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IMState } from 'src/states/IMState'

interface MessageProps extends RouteComponentProps {
  imState: IMState
}
const Message = observer(({ imState }: MessageProps) => {
  return (
    <div>
      {imState.convList.map(({ text, conversationId }) => (
        <span key={conversationId}>
          {text} : {conversationId}
        </span>
      ))}
    </div>
  )
})

export default withRouter(Message)
