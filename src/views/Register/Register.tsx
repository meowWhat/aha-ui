import './Register.less'
import { Button, List, InputItem, Radio } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import request from '../../utils/request'

const Register = (props: RouteComponentProps) => {
  const { email: pEmail } = props.match.params as { email: string }
  const [svg, setSvg] = useState('')
  const [email, setEmail] = useState(pEmail)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    getCaptcha()
    return () => {}
  }, [])

  const getCaptcha = () => {
    request
      .get<any, { svg: string }>('/app/captcha')
      .then((data) => {
        if (data) {
          setSvg(data.svg)
        }
      })
      .catch()
  }
  return (
    <div className="container">
      <div className="heart register-content">
        <header className="register-header">
          <h3 className="register-header-title">发送邮箱验证码</h3>
          <span className="register-header-info">
            <span
              onClick={() => {
                setChecked((flag) => !flag)
              }}
            >
              <Radio checked={checked} />
            </span>
            &nbsp;已阅读并同意<span className="blue">服务协议</span>和<span className="blue">隐私政策</span>
          </span>
        </header>
        <List>
          <InputItem
            placeholder="输入邮箱"
            value={email}
            onChange={(value) => {
              setEmail(value)
            }}
          ></InputItem>
          <div className="register-input-group">
            <InputItem
              placeholder="输入图片验证码"
              value={text}
              onChange={(value) => {
                setText(value)
              }}
            ></InputItem>
            <span dangerouslySetInnerHTML={{ __html: svg }}></span>
          </div>
        </List>
        <Button
          onClick={() => {
            props.history.push(`/create/${email}`)
          }}
          disabled={!checked}
        >
          下一步
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Register)
