import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button, List, InputItem } from 'antd-mobile'
import { useEffect, useState } from 'react'

const Create = (props: RouteComponentProps) => {
  const { email: pEmail } = props.match.params as { email: string }

  const [pwd, setPwd] = useState('')
  const [code, setCode] = useState('')
  const [time, setTime] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time > 0) {
          return time - 1
        }
        clearInterval(timer)
        return time
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="container">
      <div className="heart register-content">
        <header className="register-header">
          <h3 className="register-header-title">注册用户</h3>
        </header>
        <List>
          <div className="register-input-group">
            <InputItem
              placeholder="邮箱验证码"
              value={code}
              onChange={(value) => {
                setCode(value)
              }}
            ></InputItem>
            <Button
              disabled={time === 0 ? false : true}
              onClick={() => {
                props.history.replace(`/register/${pEmail}`)
              }}
            >
              {time === 0 ? '重新发送' : `${time}秒`}
            </Button>
          </div>
          <InputItem
            placeholder="输入新的密码"
            type="password"
            value={pwd}
            onChange={(value) => {
              setPwd(value)
            }}
          ></InputItem>
        </List>
        <Button
          onClick={() => {
            alert('注册')
          }}
        >
          注册
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Create)
