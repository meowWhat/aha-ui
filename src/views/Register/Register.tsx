import './Register.less'
import { Button, List, InputItem, Radio, Modal } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Req } from 'src/type'
import { service, validate } from 'src/utils'
import { handleResMessage } from 'src/api/resHandle'

const Register = (props: RouteComponentProps) => {
  const { email: pEmail } = props.location.state as { email: string }
  const { isCreate = true } = props.location.state as { isCreate: boolean }

  const [svg, setSvg] = useState('')
  const [email, setEmail] = useState(pEmail)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCaptcha()
    return () => {}
  }, [])

  const getCaptcha = () => {
    service.get<any, Req>('/app/captcha').then((data) => {
      if (data && data.message) {
        setSvg(data.message.svg)
      }
    })
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
            <span
              dangerouslySetInnerHTML={{ __html: svg }}
              onClick={() => {
                getCaptcha()
              }}
            ></span>
          </div>
        </List>
        <Button
          onClick={() => {
            if (!validate.isEmail(email)) {
              return Modal.alert('', '邮箱格式错误,请重新输入!')
            }
            if (!validate.isString(text)) {
              return Modal.alert('', '验证码格式错误,不能为空!')
            }
            setLoading(true)
            service
              .get<any, Req>('/register', { params: { email, text, isCreate } })
              .then((data) => {
                setLoading(false)
                if (data.statusCode === 200) {
                  // 进入下一步
                  props.history.push('/create', {
                    email,
                    isCreate,
                  })
                } else {
                  handleResMessage(data.message, '验证码发送失败,请稍后再试')
                }
              })
              .catch(() => {
                setLoading(false)
              })
          }}
          loading={loading}
          disabled={!checked}
        >
          下一步
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Register)
