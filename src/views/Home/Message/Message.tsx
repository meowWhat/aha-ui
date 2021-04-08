import { observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IMState } from 'src/states/IMState'
import { Item } from 'src/components'
import './Message.less'
import { Fragment, useEffect, useState } from 'react'
import { useRef } from 'react'
import { Modal, ActivityIndicator } from 'antd-mobile'
import { ConversationLocation } from 'src/views/User/Conversation/Conversation'
import { getFriendIdByConvId, getFriendInfo } from 'src/api/cacheApi'
import { LOADING } from 'src/api/msgConst'
import { db } from 'src/api/indexDB'
import { handleErrorMsg, handleSuccessMsg } from 'src/api/resHandle'

const operation = Modal.operation

interface MessageProps extends RouteComponentProps {
  imState: IMState
}
interface ListItem {
  text: string
  conversationId: string
  avatar: string
  nickName: string
  date: string
  remark?: string
}

const Message = observer(({ imState, history }: MessageProps) => {
  const ref = useRef<{ startTime: number; timer?: NodeJS.Timeout }>({
    startTime: 0,
  })
  const [list, setList] = useState<Array<ListItem>>([])
  const [loading, setLoading] = useState(true)
  const longPress = (convId: string) => {
    operation([
      {
        text: '删除该聊天',
        onPress: () => {
          db.deletConvItem(convId)
            .then(() => {
              handleSuccessMsg('删除成功')
              imState.updateConv()
            })
            .catch((err) => handleErrorMsg(err, '删除失败'))
        },
      },
    ])
  }
  const click = (convId: string, nickName: string, avatar: string, remark = '') => {
    const state: ConversationLocation = {
      nickName: remark || nickName,
      convId,
      avatar,
    }
    history.push('/user/conversation', state)
  }

  useEffect(() => {
    setLoading(true)
    // 假装有 converRender 依赖
    if (imState.converRenderFlag) {
    }
    db.getConvList()
      .then((res) => {
        return Promise.all(
          res.map(({ conversationId, text, date }) => {
            return new Promise<ListItem>((reslove) => {
              const friendId = getFriendIdByConvId(conversationId)
              const res = {
                text,
                conversationId,
                avatar: 'error',
                nickName: friendId,
                date,
                remark: ''
              }
              getFriendInfo(friendId)
                .then((data) => {
                  if (data) {
                    res.avatar = data.avatar
                    res.nickName = data.nickname
                    res.remark = data.remark || ''
                  }
                  reslove(res)
                })
                .finally(() => {
                  reslove(res)
                })
            })
          }),
        )
      })
      .then((list) => {
        setList(list)
        setLoading(false)
      })
  }, [imState.converRenderFlag])
  return (
    <div className="msg">
      {!loading ? (
        list.map(({ text, nickName, avatar, conversationId, date, remark }) => {
          return (
            <div
              key={conversationId}
              onTouchStart={(e) => {
                ref.current.startTime = Date.now()
                ref.current.timer = setTimeout(
                  longPress.bind(undefined, conversationId) as any,
                  700,
                )
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
                  click(conversationId, nickName, avatar, remark)
                  if (ref.current.timer) {
                    clearTimeout(ref.current.timer)
                  }
                }
              }}
            >
              <Item
                left={<img src={avatar} alt="头像"></img>}
                content={
                  <Fragment>
                    <div className="msg-nickName">{remark || nickName}</div>
                    <p className="msg-text">{text}</p>
                  </Fragment>
                }
                right={
                  <Fragment>
                    <div className="msg-time">{date}</div>
                  </Fragment>
                }
              />
            </div>
          )
        })
      ) : (
        <ActivityIndicator text={LOADING} />
      )}
    </div >
  )
})

export default withRouter(Message)
