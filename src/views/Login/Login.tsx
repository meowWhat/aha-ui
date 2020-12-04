import './Login.less'
import logo from '../../img/logo.jpg'
import title from '../../img/title.jpg'
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd-mobile'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
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
              setLoading(true)
              setTimeout(() => {
                // 登录失败
                Modal.alert('登录失败', '账号或密码错误,请重新输入', [{ text: 'OK', onPress: () => setLoading(false) }])
              }, 3000)
            }}
          >
            登录
          </Button>
        </div>
        {/* 密码找回/注册  */}
        <footer className="footer">
          <Link to="/forget">找回密码</Link>
          <Link to="/register">新用户注册</Link>
        </footer>
      </div>
    </div>
  )
}

export default Login
