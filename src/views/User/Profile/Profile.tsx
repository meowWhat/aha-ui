import { RouteComponentProps } from 'react-router'
import { LinkmanListItem } from 'src/views/Home/Linkman/Linkman'
import {
  RightOutlined,
  MessageOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Item } from 'src/components'
import { NoticeBar, WhiteSpace } from 'antd-mobile'
import './Profile.less'
import { Fragment } from 'react'
import { ConversationLocation } from '../Conversation/Conversation'
import { getConvId } from 'src/api/cacheApi'
import { UserInfo } from 'src/components'

export default function Profile(props: RouteComponentProps) {
  const { avatar, nickName, address, email, sex, id } = props.location
    .state as LinkmanListItem
  return (
    <div className="user-profile">
      <UserInfo
        info={{
          nickName,
          avatar,
          address,
          email,
          sex: sex === '0' ? '0' : '1',
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
              众里寻他千百asdasdasdasdasd
            </NoticeBar>
          </div>
        }
      />
      <WhiteSpace size="sm"></WhiteSpace>
      <Item content={<span>设置备注</span>} right={<RightOutlined />} />
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
