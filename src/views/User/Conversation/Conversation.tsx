import {
  PlusCircleOutlined,
  SmileOutlined,
  AudioOutlined,
  SendOutlined,
  PictureOutlined,
  PhoneOutlined,
  HistoryOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useEffect, useState, useRef } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { MsgBox } from 'src/components'
import img from 'src/img/logo.jpg'
import './Conversation.less'
import { Popover } from 'antd-mobile'
const Item = Popover.Item
interface ConversationProps {
  onLoad: (nickName: string) => void
}

export interface ConversationLocation {
  id: string
  nickName: string
}

const scroll = () => {
  window.scrollTo({ top: document.querySelector('.user-content')?.clientHeight, behavior: 'smooth' })
}
const Conversation = (props: ConversationProps & RouteComponentProps) => {
  const { onLoad } = props
  const { id, nickName } = props.history.location.state as ConversationLocation
  // 控制当前状态为 输入 或 发送
  const [isInput, setIsInput] = useState(false)
  // 控制输入框内容
  const [value, setValue] = useState('')
  // 控制表情包扩展
  const [isEmoji, setIsEmoji] = useState(true)
  const textArea = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    onLoad(nickName)
    let event: any
    if (/Android/gi.test(navigator.userAgent)) {
      const innerHeight = window.innerHeight
      event = window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight
        if (innerHeight > newInnerHeight) {
          // 键盘弹出事件处理
          scroll()
        }
      })
    } else {
      event =
        textArea.current &&
        textArea.current.addEventListener('focusin', () => {
          // 键盘弹出事件处理
          scroll()
        })
    }
    scroll()
    return () => {
      if (/Android/gi.test(navigator.userAgent)) {
        window.removeEventListener('reset', event)
      } else {
        window.removeEventListener('focusin', event)
      }
      onLoad('')
    }
  }, [onLoad, nickName])
  return (
    <div id="conversation" className="bgc-gray">
      {/* 聊天框列表 */}
      <MsgBox avatar={img} nickName={nickName}>
        牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName}>
        陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼陈总牛逼
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName}>
        牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName} type="self">
        牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName} type="self">
        牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName} type="self">
        牛年
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName}>
        牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!牛年大吉,牛气冲天!!!!
      </MsgBox>
      <MsgBox avatar={img} nickName={nickName} type="self">
        牛年大吉,牛气冲天!!!!
      </MsgBox>
      {/* 操作箱 */}
      <div className="conversation-operation bgc-deep-white">
        {/* 按住说话 */}
        <AudioOutlined />
        {/* 输入框 */}
        <textarea
          className="qwe"
          value={value}
          onChange={(e) => {
            const value = e.target.value
            setValue(value)
            if (value.trim().length > 0) {
              setIsInput(true)
            } else {
              setIsInput(false)
            }
          }}
          ref={textArea}
        ></textarea>
        {/* 表情包 */}
        <span
          onClick={() => {
            if (isEmoji === false) {
              textArea.current && textArea.current.focus()
            }
            setIsEmoji(!isEmoji)
          }}
        >
          {isEmoji ? <SmileOutlined /> : <EditOutlined />}
        </span>
        {isInput ? (
          // 发送按钮
          <SendOutlined
            onClick={() => {
              console.log('send id' + id + value)
              setValue('')
              setIsInput(false)
              textArea.current && textArea.current.focus()
            }}
          />
        ) : (
          // 更多
          <Popover
            placement="topRight"
            overlay={[
              <Item key="1" icon={<PictureOutlined />}>
                发送图片
              </Item>,
              <Item key="2" icon={<PhoneOutlined />}>
                语音通话
              </Item>,
              <Item key="3" icon={<HistoryOutlined />}>
                聊天记录
              </Item>,
            ]}
            onSelect={(_, index) => {
              switch (index) {
                case 0:
                  console.log('发送图片')
                  break
                case 1:
                  console.log('语音通话')
                  break
                case 2:
                  console.log('聊天记录')
                  break
                default:
                  break
              }
            }}
          >
            <PlusCircleOutlined />
          </Popover>
        )}
      </div>
      {/* <div className="conversation-emoji">asdasdasasdas</div> */}
    </div>
  )
}

export default withRouter(Conversation)
