import { useEffect, useState, Fragment, useRef } from 'react'
import { staticData } from 'src/states/StaticData'
import { qrCode } from 'src/utils/qrcode'
import { UserInfo, Item, UserInfoProps } from 'src/components'
import { RightOutlined } from '@ant-design/icons'
import { NoticeBar, WhiteSpace, Modal, Toast } from 'antd-mobile'
import './Profile.less'
import { profileService } from './ProfileService'
import { handleResMessage } from 'src/api/resHandle'

const prompt = Modal.prompt
const alert = Modal.alert

interface dataSource extends UserInfoProps {}

export default function Profile() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [sign, setSign] = useState(staticData.userInfo.sign)

  const [dataSource, setDataSource] = useState<dataSource>({
    info: {
      address: staticData.userInfo.address,
      email: staticData.userInfo.email,
      avatar: staticData.userInfo.avatar,
      nickName: staticData.userInfo.nickname,
      sex: staticData.userInfo.sex === '0' ? '0' : '1',
    },
  })

  useEffect(() => {
    qrCode.generate(staticData.userInfo.email).then((url) => {
      if (url) {
        setQrCodeUrl(url)
      }
    })
  }, [])

  return (
    <div className="profile">
      <UserInfo info={dataSource.info} />
      <Item
        content={<span>个性签名</span>}
        right={
          <div style={{ marginLeft: -180, textAlign: 'right' }}>
            <NoticeBar
              icon={<Fragment></Fragment>}
              marqueeProps={{ loop: true }}
            >
              {sign}
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
              <img src={qrCodeUrl} alt="二维码" style={{ width: '80%' }} />
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
                  if (value === '') {
                    Toast.fail('昵称不能为空!')
                    return
                  }

                  profileService.updateUserNickName(value).then((res) => {
                    if (res.statusCode === 200) {
                      const newDataSource = {
                        info: dataSource.info,
                      }
                      newDataSource.info.nickName = value
                      // 修改静态数据
                      staticData.userInfo.nickname = value
                      setDataSource(newDataSource)
                      Toast.success('昵称更新成功!')
                    } else {
                      handleResMessage(res.message, '昵称更新失败!')
                    }
                  })
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
                  profileService.updateUserSign(value).then((res) => {
                    if (res.statusCode === 200) {
                      staticData.userInfo.sign = value
                      setSign(value)
                      Toast.success('个性签名修改成功')
                    } else {
                      handleResMessage(res.message, '个性前面修改失败')
                    }
                  })
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
        right={<RightOutlined />}
        onClick={() => {
          prompt(
            '修改头像',
            '',
            [
              {
                text: '关闭',
              },
              {
                text: '修改',
                onPress: (value) => {
                  if (value === '') {
                    Toast.fail('链接不能为空!')
                    return
                  }

                  profileService.updateAvatar(value).then((res) => {
                    if (res.statusCode === 200) {
                      const newDataSource = {
                        info: dataSource.info,
                      }
                      newDataSource.info.avatar = value
                      // 修改静态数据
                      staticData.userInfo.avatar = value
                      setDataSource(newDataSource)
                      Toast.success('头像更新成功!')
                    } else {
                      handleResMessage(res.message, '头像更新失败!')
                    }
                  })
                },
              },
            ],
            'default',
            '',
            ['请输入头像 url '],
          )
        }}
      />
    </div>
  )
}
