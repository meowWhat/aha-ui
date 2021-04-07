import './MsgBox.less'

interface MsgBoxInterface {
  avatar: string
  nickName: string
  type?: 'self' | 'other'
  children?: any
  onAvatarClick?: () => void
}
const MsgContent = (props: {
  type: 'other' | 'self'
  children: any
  className?: string
}) => {
  const { type, children, className } = props
  const initClassName = () => {
    const _class = 'msg-content ' + (className || '')
    if (type === 'other') {
      return _class
    } else {
      return _class + ' msg-content-self'
    }
  }
  return <div className={initClassName()}>{children}</div>
}

const MsgBox = (props: MsgBoxInterface) => {
  const { type = 'other', children, avatar, nickName, onAvatarClick } = props
  if (type === 'other') {
    return (
      <div className="msg-box">
        <img
          src={avatar}
          alt="头像"
          className="msg-box-avatar"
          onClick={() => {
            onAvatarClick && onAvatarClick()
          }}
        />
        <div className="msg-box-body">
          <span></span>
          <span className="msg-box-body-nickname gray">{nickName}</span>
          <MsgContent type={type}>{children}</MsgContent>
        </div>
      </div>
    )
  } else {
    return (
      <div className="msg-box msg-box-self">
        <div className="msg-box-body">
          <MsgContent type={type}>{children}</MsgContent>
        </div>
        <img src={avatar} alt="头像" className="msg-box-avatar" />
      </div>
    )
  }
}
export default MsgBox
