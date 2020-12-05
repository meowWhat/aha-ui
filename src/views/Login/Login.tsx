import './Login.less'
import logo from '../../img/logo.jpg'
import title from '../../img/title.jpg'
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd-mobile'
import { useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Req } from 'src/type'
import { withRouter } from 'react-router-dom'
import { service, validate } from 'src/utils'

const Login = (props: RouteComponentProps) => {
  const [text, setText] = useState('')
  const [pwd, setPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div id="login">
      <div className="content container">
        {/*   LOGO */}
        <header className="header">
          <img src={logo} alt="aha-logo" className="header-logo" />
          <img src={title} alt="aha-logo" className="header-title" />
        </header>
        {/* 登录表单 */}
        <div className="form">
          <div className="form-surround">
            {/* 账号输入 */}
            <span>
              <UserOutlined style={{ color: '#ddd' }} />
            </span>

            <input
              type="text"
              className="form-input"
              onChange={(e) => {
                setText(e.target.value)
              }}
              value={text}
            />
            <span>
              <CloseOutlined
                style={{ color: '#ddd' }}
                onClick={() => {
                  setText('')
                }}
              />
            </span>
          </div>
          {/* 密码输入 */}
          <div className="form-surround">
            <span
              onClick={() => {
                setShowPwd(!showPwd)
              }}
            >
              {showPwd ? <EyeInvisibleOutlined style={{ color: 'red' }} /> : <EyeOutlined style={{ color: '#ddd' }} />}
            </span>
            <input
              type={showPwd ? 'text' : 'password'}
              className="form-input"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value)
              }}
            />
            <span>
              <CloseOutlined
                style={{ color: '#ddd' }}
                onClick={() => {
                  setPwd('')
                }}
              />
            </span>
          </div>
        </div>
        {/* 表单提交按钮 */}
        <div className="button">
          <Button
            loading={loading}
            onClick={() => {
              if (!validate.isEmail(text)) {
                return Modal.alert('', '邮箱格式错误,请重新输入!')
              }
              if (!validate.isString(pwd, 6)) {
                return Modal.alert('', '密码格式错误,长度不得低于6位!')
              }
              setLoading(true)
              service
                .post<any, Req>('/login', { email: text, password: pwd })
                .then((res) => {
                  setLoading(false)
                  if (res && res.statusCode === 200) {
                    props.history.push('/home')
                  } else {
                    Modal.alert('', '用户名或密码不正确,请重新输入!')
                  }
                })
                .catch(() => {
                  setLoading(false)
                })
            }}
          >
            登录
          </Button>
        </div>
        {/* 密码找回/注册  */}
        <footer className="footer">
          <Link
            to={{
              pathname: '/register',
              state: {
                isCreate: false,
                email: '',
              },
            }}
          >
            找回密码
          </Link>
          <Link
            to={{
              pathname: '/register',
              state: {
                isCreate: true,
                email: '',
              },
            }}
          >
            新用户注册
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default withRouter(Login)
