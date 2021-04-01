import { useEffect, useState, Fragment, useRef } from 'react'
import { staticData } from 'src/states/StaticData'
import { qrCode } from 'src/utils/qrcode'
import { UserInfo, Item } from 'src/components'
import { RightOutlined, UploadOutlined } from '@ant-design/icons'
import { NoticeBar, WhiteSpace, Modal, Toast } from 'antd-mobile'
import './Profile.less'

const prompt = Modal.prompt
const alert = Modal.alert

export default function Profile() {
  const [url, setUrl] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    qrCode.generate(staticData.userInfo.email).then((url) => {
      if (url) {
        setUrl(url)
      }
    })
  }, [])

  return (
    <div className="profile">
      <UserInfo
        info={{
          address: staticData.userInfo.address,
          email: staticData.userInfo.email,
          avatar: staticData.userInfo.avatar,
          nickName: staticData.userInfo.nickname,
          sex: staticData.userInfo.sex === '0' ? '0' : '1',
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
      <Item
        content={<span>我的二维码</span>}
        right={<RightOutlined />}
        onClick={() => {
          alert(
            '二维码',
            <div>
              <img src={url} alt="二维码" style={{ width: '80%' }} />
            </div>,
            [{ text: '关闭' }],
          )
        }}
      />
      <WhiteSpace size="sm"></WhiteSpace>
      <Item
        content={<span>修改昵称</span>}
        right={<RightOutlined />}
        onClick={() => {
          prompt(
            '修改昵称',
            '',
            [
              {
                text: '关闭',
              },
              {
                text: '修改',
                onPress: (value) => {
                  console.log('FFf')
                },
              },
            ],
            'default',
            '',
            ['请输入新的昵称'],
          )
        }}
      />
      <Item
        content={<span>修改个性签名</span>}
        right={<RightOutlined />}
        onClick={() => {
          prompt(
            '修改个性签名',
            '',
            [
              {
                text: '关闭',
              },
              {
                text: '修改',
                onPress: (value) => {
                  console.log('FFf')
                },
              },
            ],
            'default',
            '',
            ['请输入新的个性签名'],
          )
        }}
      />
      <Item
        content={<span>修改头像</span>}
        right={<UploadOutlined />}
        onClick={() => {
          input.current?.click()
        }}
      />

      <input
        ref={input}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) {
            const files = e.target.files
            if (files && files.length > 0) {
              const file = files[0]
              const reader = new FileReader()
              if (file.type === '') {
                return
              }
              const [mime] = file.type.split('/')

              reader.addEventListener('load', async () => {
                if (!reader.result) {
                  return
                }
                if (mime === 'image') {
                  console.log(reader.result)
                } else {
                  Toast.fail('上传失败,请检查文件格式,必须为标准图片类型！')
                }
              })

              reader.readAsDataURL(file)
            }
          }
        }}
      />
    </div>
  )
}
