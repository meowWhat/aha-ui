import { observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IMState } from 'src/states/IMState'
import { Item } from 'src/components'
import './Message.less'
import img from 'src/img/logo.jpg'
import { Fragment } from 'react'
import { useRef } from 'react'
import { Modal } from 'antd-mobile'
const operation = Modal.operation

interface MessageProps extends RouteComponentProps {
  imState: IMState
}

const Message = observer(({ imState }: MessageProps) => {
  const ref = useRef<{ startTime: number; timer?: NodeJS.Timeout }>({ startTime: 0 })
  const longPress = () => {
    operation([
      {
        text: '删除该聊天',
        onPress: () => {
          console.log('todo')
        },
      },
      // { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
    ])
  }
  const click = () => {
    console.log('点击事件')
  }
  return (
    <div className="msg">
      <div
        onTouchStart={(e) => {
          ref.current.startTime = Date.now()
          ref.current.timer = setTimeout(longPress, 700)
          e.preventDefault()
        }}
        onTouchMove={() => {
          if (ref.current.timer) {
            clearTimeout(ref.current.timer)
            ref.current.timer = undefined
            ref.current.startTime = 0
          }
        }}
        onTouchEnd={() => {
          if (Date.now() - ref.current.startTime < 700) {
            click()
          }
          if (ref.current.timer) {
            clearTimeout(ref.current.timer)
          }
        }}
      >
        <Item
          left={<img src={img}></img>}
          content={
            <Fragment>
              <div className="msg-nickName">昵称最长最长最长最长</div>
              <p className="msg-text">asdasdasdasdasdasdasdasdasdasda aasdasdasdasdasdadasasdsd</p>
            </Fragment>
          }
          right={
            <Fragment>
              <div className="msg-time">2020年12月31日</div>
            </Fragment>
          }
        />
      </div>
    </div>
  )
})

export default withRouter(Message)
