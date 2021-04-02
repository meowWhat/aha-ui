import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button, List, InputItem, Modal } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { service, validate } from 'src/utils'
import { Res } from 'src/type'
import { handleErrorMsg } from 'src/api/resHandle'

const Create = (props: RouteComponentProps) => {
  const { email: pEmail = '' } = props.location.state as { email: string }
  const { isCreate = true } = props.location.state as { isCreate: boolean }

  const [pwd, setPwd] = useState('')
  const [code, setCode] = useState('')
  const [time, setTime] = useState(10)
  const [loading, setLoading] = useState(false)

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
            // 校验
            if (!validate.isEmail(pEmail)) {
              return handleErrorMsg('邮箱格式错误,请重新输入!')
            }
            if (!validate.isString(pwd, 6)) {
              return handleErrorMsg('密码格式错误,长度不得低于6位!')
            }
            if (!validate.isString(code)) {
              return handleErrorMsg('验证码格式错误,不能为空!')
            }
            // 请求
            setLoading(true)
            const data = { email: pEmail, password: pwd, code }
            if (isCreate) {
              // 注册用户
              service
                .post<any, Res>('/register', data)
                .then((data) => {
                  setLoading(false)
                  if (data && data.statusCode === 200) {
                    // 注册成功
                    Modal.alert('', '注册成功,点击确认跳转至首页', [
                      {
                        text: 'ok',
                        onPress: () => {
                          props.history.push('/home')
                        },
                      },
                    ])
                  } else {
                    handleErrorMsg(data.message, '注册失败')
                  }
                })
                .catch(() => {
                  setLoading(false)
                })
            } else {
              // 修改密码
              service
                .put<any, Res>('/register/forget', data)
                .then((data) => {
                  setLoading(false)
                  if (data && data.statusCode === 200) {
                    // 修改密码成功
                    Modal.alert('', '修改密码成功,请重新登录', [
                      {
                        text: 'ok',
                        onPress: () => {
                          props.history.push('/login')
                        },
                      },
                    ])
                  } else {
                    handleErrorMsg(data.message, '密码修改失败')
                  }
                })
                .catch(() => {
                  setLoading(false)
                })
            }
          }}
          loading={loading}
        >
          注册
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Create)
