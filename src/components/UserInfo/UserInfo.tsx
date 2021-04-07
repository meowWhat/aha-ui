import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import './UserInfo.less'

export interface UserInfoProps {
  info: {
    avatar: string
    nickName: string
    sex?: 0 | 1
    email?: string
    address?: string
  }
}

export default function UserInfo(props: UserInfoProps) {
  const {
    avatar,
    nickName,
    sex = 1,
    email = '秘密',
    address = '秘密',
  } = props.info

  return (
    <div className="user-profile-info">
      <img src={avatar} alt={nickName} className="user-profile-info-avatar" />
      <div className="user-profile-info-desp">
        <div>
          <span className="user-profile-info-desp-nickname">
            {nickName}&nbsp;
          </span>
          <span
            className="user-profile-info-desp-sex"
            style={{ color: sex === 1 ? 'blue' : 'pink' }}
          >
            {sex === 1 ? <ManOutlined /> : <WomanOutlined />}
          </span>
        </div>
        <span className="user-profile-info-desp-email gray">
          邮箱:&nbsp;{email || '秘密'}
        </span>
        <span className="user-profile-info-desp-adress gray">
          地区:&nbsp;{address || '秘密'}
        </span>
      </div>
    </div>
  )
}
