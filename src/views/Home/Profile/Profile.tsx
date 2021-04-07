import { useEffect, useState, Fragment } from 'react'
import { staticData } from 'src/states/StaticData'
import { qrCode } from 'src/utils/qrcode'
import { UserInfo, Item, UserInfoProps } from 'src/components'
import { RightOutlined } from '@ant-design/icons'
import { NoticeBar, WhiteSpace, Modal } from 'antd-mobile'
import './Profile.less'
import { profileService } from 'src/services'
import { handleErrorMsg, handleSuccessMsg } from 'src/api/resHandle'

const prompt = Modal.prompt
const alert = Modal.alert
const operation = Modal.operation

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
      sex: staticData.userInfo.sex === 0 ? 0 : 1,
    },
  })

  useEffect(() => {
    qrCode.generate(staticData.userInfo.email).then((url) => {
      if (url) {
        setQrCodeUrl(url)
      }
    })
  }, [])

  const handleSexChange = (sex: 0 | 1) => {
    profileService
      .updateUserSex(sex)
      .then((res) => {
        if (res.statusCode === 200) {
          const newDataSource = {
            info: dataSource.info,
          }
          newDataSource.info.sex = sex
          // 修改静态数据
          staticData.userInfo.sex = sex
          setDataSource(newDataSource)
          handleSuccessMsg('修改性别成功')
        } else {
          handleErrorMsg(res.message, '修改性别失败')
        }
      })
      .catch((err) => handleErrorMsg(err, '修改性别失败'))
  }
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
              <img src={qrCodeUrl} alt="二维码" />
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
                    handleErrorMsg('昵称不能为空')
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
                      handleSuccessMsg('昵称更新成功!')
                    } else {
                      handleErrorMsg(res.message, '昵称更新失败!')
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
        content={<span>更改性别</span>}
        right={<RightOutlined />}
        onClick={() => {
          operation([
            {
              text: '切换为男生',
              onPress: () => {
                if (dataSource.info.sex !== 1) {
                  handleSexChange(1)
                }
              },
            },
            {
              text: '切换为女生',
              onPress: () => {
                if (dataSource.info.sex !== 0) {
                  handleSexChange(0)
                }
              },
            },
          ])
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
                      handleSuccessMsg('个性签名修改成功!')
                    } else {
                      handleErrorMsg(res.message, '个性前面修改失败')
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
                    handleErrorMsg('链接不能为空!')
                    return
                  }

                  profileService.updateAvatar(value).then((res) => {
                    if (res.statusCode === 200) {
                      handleSuccessMsg('头像更新成功!')
                    } else {
                      handleErrorMsg(res.message, '头像更新失败!')
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
