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
import { MsgBox, Emoji } from 'src/components'
import './Conversation.less'
import { Popover } from 'antd-mobile'
import classNames from 'classnames'
import { im } from 'src/api/IMDriver'
import { db } from 'src/api/indexDB'
import { staticData } from 'src/states/StaticData'

const Item = Popover.Item
interface ConversationProps {
  onLoad: (nickName: string) => void
}

export interface ConversationLocation {
  convId: string
  nickName: string
  avatar: string
}

interface ListItem {
  from: 'self' | 'other'
  text: string
  id: number
}
const Conversation = (props: ConversationProps & RouteComponentProps) => {
  const { onLoad } = props
  const { convId, nickName: friendName, avatar: friendAvatar } = props.history.location
    .state as ConversationLocation
  const [list, setList] = useState<Array<ListItem>>([])
  // 控制当前状态为 输入 或 发送
  const [isInput, setIsInput] = useState(false)
  // 控制输入框内容
  const [value, setValue] = useState('')
  // 控制表情包扩展
  const [isEmoji, setIsEmoji] = useState(true)
  const textArea = useRef<HTMLTextAreaElement>(null)
  const scroll = (isAuto: boolean) => {
    setIsEmoji(true)
    window.scrollTo({
      top: document.querySelector('.user-content')?.clientHeight,
      behavior: isAuto ? 'auto' : 'smooth',
    })
  }
  useEffect(() => {
    onLoad(friendName)
    // 更新列表
    db.getMsgByConvId(convId, 25, 'next').then((data) => {
      setList(
        data.map(({ content, sendId, id }) => {
          const res: ListItem = {
            from: 'other',
            text: '',
            id,
          }
          if (sendId === staticData.userId) {
            res.from = 'self'
          }
          res.text = content
          return res
        }),
      )
    })
    let event: any
    if (/Android/gi.test(navigator.userAgent)) {
      const innerHeight = window.innerHeight
      event = window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight
        if (innerHeight > newInnerHeight) {
          // 键盘弹出事件处理
          scroll(true)
        }
      })
    } else {
      event =
        textArea.current &&
        textArea.current.addEventListener('focusin', () => {
          // 键盘弹出事件处理
          scroll(true)
        })
    }
    scroll(false)
    return () => {
      if (/Android/gi.test(navigator.userAgent)) {
        window.removeEventListener('reset', event)
      } else {
        window.removeEventListener('focusin', event)
      }
      onLoad('')
    }
  }, [onLoad, friendName, convId])
  return (
    <div id="conversation" className={classNames('bgc-gray', { 'conversation-expand': !isEmoji })}>
      {/* 聊天框列表 */}
      <div className="conversation-list">
        {list.map(({ from, text, id }) => {
          if (from === 'self') {
            return (
              <MsgBox avatar={'xxx'} nickName={'自己'} type="self" key={id}>
                {text}
              </MsgBox>
            )
          }
          return (
            <MsgBox avatar={friendAvatar} nickName={friendName} key={id}>
              {text}
            </MsgBox>
          )
        })}
      </div>
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
        />
        {/* 表情包 */}
        {isEmoji ? (
          <SmileOutlined
            onClick={() => {
              setTimeout(() => {
                setIsEmoji(false)
              })
            }}
          />
        ) : (
          <EditOutlined
            onClick={() => {
              if (isEmoji === false) {
                textArea.current && textArea.current.focus()
              }
            }}
          />
        )}
        {isInput ? (
          // 发送按钮
          <SendOutlined
            onClick={() => {
              im.sendMessage(value, '4')
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
        {/* 表情包扩展 */}
        <div className={classNames('conversation-operation-emoji', { hidden: isEmoji })}>
          <Emoji></Emoji>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Conversation)