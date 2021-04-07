import { RouteComponentProps } from 'react-router'
import { LinkmanListItem } from 'src/views/Home/Linkman/Linkman'
import {
  RightOutlined,
  MessageOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Item } from 'src/components'
import { NoticeBar, WhiteSpace, Modal } from 'antd-mobile'
import './Profile.less'
import { Fragment } from 'react'
import { ConversationLocation } from '../Conversation/Conversation'
import { getConvId, getFriendInfo } from 'src/api/cacheApi'
import { UserInfo } from 'src/components'
import { friendService } from 'src/services'
import { handleErrorMsg, handleSuccessMsg } from 'src/api/resHandle'
import { validate } from 'src/utils'

const prompt = Modal.prompt

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
      <Item content={<span>朋友权限</span>} right={<RightOutlined />} />
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
            <VideoCameraOutlined /> &nbsp;音视频通话
          </div>
        }
      />
    </div>
  )
}
