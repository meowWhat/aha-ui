import { RouteComponentProps } from 'react-router'
import { LinkmanListItem } from 'src/views/Home/Linkman/Linkman'
import { ManOutlined, WomanOutlined, RightOutlined, MessageOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Item } from 'src/components'
import { NoticeBar, WhiteSpace } from 'antd-mobile'
import './Profile.less'
import { Fragment } from 'react'
import { ConversationLocation } from '../Conversation/Conversation'

export default function Profile(props: RouteComponentProps) {
  const { avatar, nickName, address, email, sex, id } = props.location.state as LinkmanListItem
  return (
    <div className="user-profile">
      <div className="user-profile-info">
        <img src={avatar} alt={nickName} className="user-profile-info-avatar" />
        <div className="user-profile-info-desp">
          <div>
            <span className="user-profile-info-desp-nickname">{nickName}&nbsp;</span>
            <span className="user-profile-info-desp-sex" style={{ color: sex === '0' ? 'blue' : 'pink' }}>
              {sex === '0' ? <ManOutlined /> : <WomanOutlined />}
            </span>
          </div>
          <span className="user-profile-info-desp-email gray">邮箱:&nbsp;{email || '秘密'}</span>
          <span className="user-profile-info-desp-adress gray">地区:&nbsp;{address || '秘密'}</span>
        </div>
      </div>
      <Item
        content={<span>个性签名</span>}
        right={
          <div style={{ marginLeft: -180, textAlign: 'right' }}>
            <NoticeBar icon={<Fragment></Fragment>} marqueeProps={{ loop: true }}>
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
                id,
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
