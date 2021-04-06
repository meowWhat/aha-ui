import './FriendAdder.less'
import { List, InputItem, Result } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { ScanOutlined, ItalicOutlined } from '@ant-design/icons'
import validator from 'src/utils/validator'
import QrReader from 'react-qr-reader'
import { observer } from 'mobx-react'
import { IMState } from 'src/states/IMState'
import { InviteObject } from 'src/type'
import { db } from 'src/api/indexDB'
import { getUserInfo } from 'src/api/cacheApi'
import { friendService } from 'src/services'
import { im } from 'src/api/IMDriver'
import { handleErrorMsg, handleSuccessMsg } from 'src/api/resHandle'

interface FriendAdderProps {
  onLoad: (title: string) => void
  imState: IMState
}

interface ListItem extends InviteObject {
  nickName: string
  avatar: string
}
const FriendAdder = observer((props: FriendAdderProps) => {
  const { onLoad, imState } = props
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const [isShowQrScan, setIsShowQrScan] = useState(false)
  const [inviteList, setInviteList] = useState<ListItem[]>([])

  const qr = useRef<any>(null)

  // email input value change
  const handleValueChange = (value: string) => {
    if (validator.isEmail(value)) {
      setHasError(false)
    } else {
      setHasError(true)
    }
    setValue(value)
  }

  // 处理添加好友
  const handleFriendAdd = async (friendEmail: string) => {
    try {
      const res = await friendService.addFriend(friendEmail)
      if (res.statusCode === 200) {
        const friendId: string = res.message.friendId + ''
        const key: string = res.message.key
        await im.inviteFriend(friendId, key)
        handleSuccessMsg('消息已发送!')
      } else {
        handleErrorMsg(res.message, '消息发送失败')
      }
    } catch (error) {
      handleErrorMsg(error, '好友邀请失败,请稍后再试~~')
    }
  }

  const renderOperation = (isAccept: boolean) => {
    if (isAccept) {
      return <span>已添加</span>
    }

    return <span color="green">同意</span>
  }

  useEffect(() => {
    onLoad('新的朋友')
  }, [onLoad])

  useEffect(() => {
    // 假装依赖
    if (imState.inviteRenderFlag) {
    }
    const doService = async () => {
      try {
        const res = await db.getInviteList()
        const list = await Promise.all(
          res.map(async ({ isAccept, userId, key }) => {
            const { nickname, avatar } = await getUserInfo(userId)
            return {
              avatar,
              nickName: nickname,
              userId,
              isAccept,
              key,
            }
          }),
        )
        setInviteList(list)
      } catch (error) {
        console.log(error)
      }
    }
    doService()
  }, [imState.inviteRenderFlag])

  return (
    <div className="aha-friend-adder">
      <div className="aha-friend-adder-qrscan">
        {isShowQrScan ? (
          <QrReader
            ref={qr}
            delay={300}
            onError={() => {
              handleErrorMsg('您的系统不支持二维码扫描!')
              setIsShowQrScan(false)
            }}
            onScan={(data) => {
              if (data !== null) {
                handleFriendAdd(data)
                setIsShowQrScan(false)
              }
            }}
            style={{ width: '100%' }}
          />
        ) : null}
      </div>

      <List renderHeader={() => '添加新的朋友'}>
        <InputItem
          type="text"
          placeholder="请输入好友邮箱"
          error={hasError}
          onChange={handleValueChange}
          value={value}
        >
          邮箱
        </InputItem>
        <List.Item>
          <div
            className="aha-friend-adder-list-item"
            onClick={() => {
              if (hasError) {
                handleErrorMsg('邮箱格式错误,请重新输入！')
              }
              handleFriendAdd(value)
            }}
          >
            <ItalicOutlined /> &nbsp;&nbsp;&nbsp;输入邮箱添加
          </div>
        </List.Item>

        <List.Item>
          <div
            className="aha-friend-adder-list-item"
            onClick={() => {
              setIsShowQrScan(true)
            }}
          >
            <ScanOutlined /> 扫描二维码添加
          </div>
        </List.Item>
      </List>

      <List renderHeader={() => '新的朋友'}>
        {inviteList.length > 0 ? (
          inviteList.map(({ avatar, isAccept, nickName, userId, key }) => {
            return (
              <List.Item
                key={userId}
                thumb={avatar}
                extra={renderOperation(isAccept)}
                onClick={() => {
                  if (!isAccept) {
                    friendService.acceptFriend(key).then((res) => {
                      if (res.statusCode === 200) {
                        db.updateInviteItem({
                          userId,
                          isAccept: true,
                          key,
                        }).then(() => {
                          handleSuccessMsg(`成功添加好友 ${nickName} `)
                          imState.updateInvite()
                        })
                      } else {
                        db.deleteInviteItem(userId).then(() => {
                          handleErrorMsg(res.message, '好友添加失败')
                          imState.updateInvite()
                        })
                      }
                    })
                  }
                }}
              >
                {nickName}
              </List.Item>
            )
          })
        ) : (
          <Result
            img={
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg"
                className="spe am-icon am-icon-md"
                alt=""
              />
            }
            message="暂无好友申请"
          />
        )}
      </List>
    </div>
  )
})

export default FriendAdder
