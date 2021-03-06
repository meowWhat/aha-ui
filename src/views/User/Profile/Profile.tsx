import { RouteComponentProps } from 'react-router'
import { LinkmanListItem } from 'src/views/Home/Linkman/Linkman'
import {
  RightOutlined,
  MessageOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Item, RenderVoip } from 'src/components'
import { NoticeBar, WhiteSpace, Modal } from 'antd-mobile'
import './Profile.less'
import { Fragment } from 'react'
import { ConversationLocation } from '../Conversation/Conversation'
import { getConvId, getFriendInfo } from 'src/api/cacheApi'
import { UserInfo } from 'src/components'
import { friendService } from 'src/services'
import { handleErrorMsg, handleSuccessMsg } from 'src/api/resHandle'
import { validate } from 'src/utils'
import { db } from 'src/api/indexDB'
import { im } from 'src/api/IMDriver'

const prompt = Modal.prompt
const operation = Modal.operation
const alert = Modal.alert

export default function Profile(props: RouteComponentProps) {
  const { avatar, nickName, address, email, sex, id, sign, remark } = props
    .location.state as LinkmanListItem
  return (
    <div className="user-profile">
      <UserInfo
        info={{
          nickName,
          avatar,
          address,
          email,
          sex: sex === 0 ? 0 : 1,
          remark,
        }}
      />
      <Item
        content={<span>个性签名</span>}
        right={
          <div style={{ marginLeft: -180, textAlign: 'right' }}>
            <NoticeBar
              icon={<Fragment></Fragment>}
              marqueeProps={{ loop: true }}
            >
              {sign}
            </NoticeBar>
          </div>
        }
      />
      <WhiteSpace size="sm"></WhiteSpace>
      <Item
        content={<span>设置备注</span>}
        right={<RightOutlined />}
        onClick={() => {
          prompt(
            '修改备注',
            '',
            [
              {
                text: '关闭',
              },
              {
                text: '修改',
                onPress: (value: string) => {
                  const onError = (err: any) => {
                    handleErrorMsg(err, '备注修改失败!')
                  }
                  if (validate.validateLen(value, 10)) {
                    friendService
                      .updateFriend({
                        id,
                        remark: value,
                      })
                      .then((res) => {
                        if (res.statusCode === 200) {
                          getFriendInfo(id, false)
                            .then(() => {
                              handleSuccessMsg('备注修改成功')
                              props.history.push('/home/linkman')
                            })
                            .catch(onError)
                        } else {
                          onError(res.message)
                        }
                      })
                      .catch(onError)
                  }
                },
              },
            ],
            'default',
            '',
            ['请输入备注'],
          )
        }}
      />
      <Item
        content={<span>朋友权限</span>}
        right={<RightOutlined />}
        onClick={() => {
          operation([
            {
              text: '删除好友',
              onPress: () => {
                alert('删除好友', `是否删除好友 ${remark || nickName} ? `, [
                  { text: '取消' },
                  {
                    text: '继续',
                    onPress: async () => {
                      const onError = (err: any) => {
                        handleErrorMsg(err, '好友删除失败!')
                      }
                      try {
                        const res = await friendService.deletFriend(id)
                        if (res.statusCode === 200) {
                          await db.deletConvItem(getConvId(id))
                          await db.deleteInviteItem(id)
                          handleSuccessMsg('好友删除成功')
                          props.history.push('/home/linkman')
                        } else {
                          onError(res.message)
                        }
                      } catch (error) {
                        onError(error)
                      }
                    },
                  },
                ])
              },
            },
          ])
        }}
      />
      <WhiteSpace size="sm"></WhiteSpace>
      <Item content={<span>朋友圈</span>} right={<RightOutlined />} />
      <WhiteSpace size="sm"></WhiteSpace>
      <Item
        content={
          <div
            className="deep-blue"
            style={{ textAlign: 'center' }}
            onClick={() => {
              const state: ConversationLocation = {
                nickName,
                convId: getConvId(id),
                avatar,
              }
              props.history.push('/user/conversation', state)
            }}
          >
            <MessageOutlined /> &nbsp;发消息
          </div>
        }
      />
      <Item
        content={
          <div className="deep-blue" style={{ textAlign: 'center' }}>
            <VideoCameraOutlined /> &nbsp;语音通话
          </div>
        }
        onClick={
          async () => {
            const friendId = id
            const isOnline = await im.checkConnect(friendId)
            if (isOnline) {
              getFriendInfo(friendId).then(({
                nickname,
                remark,
                avatar
              }) => {
                RenderVoip('call', {
                  remark,
                  avatar,
                  nickname,
                  friendId
                })
              })
            } else {
              handleErrorMsg('远端用户已离线,无法建立通话!')
            }
          }
        }
      />
    </div>
  )
}
