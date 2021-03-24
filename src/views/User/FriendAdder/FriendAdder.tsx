import './FriendAdder.less'
import { List, InputItem, Toast } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { ScanOutlined, UploadOutlined, ItalicOutlined } from '@ant-design/icons'
import validator from 'src/utils/validator'

interface FriendAdderProps {
  onLoad: (title: string) => void
}
export default function FriendAdder(props: FriendAdderProps) {
  const { onLoad } = props
  const [value, setValue] = useState('')
  const [hasError, setHasError] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  // email input value change
  const handleValueChange = (value: string) => {
    if (validator.isEmail(value)) {
      setHasError(false)
    } else {
      setHasError(true)
    }
    setValue(value)
  }

  // 处理添加好友
  const handleFriendAdd = (friendEmail: string) => {
    console.log(friendEmail)
  }

  useEffect(() => {
    onLoad('新的朋友')
  }, [onLoad])

  return (
    <div className="aha-friend-adder">
      <List renderHeader={() => '添加新的朋友'}>
        <InputItem
          type="text"
          placeholder="请输入好友邮箱"
          error={hasError}
          onChange={handleValueChange}
          value={value}
        >
          邮箱
        </InputItem>
        <List.Item>
          <div
            className="aha-friend-adder-list-item"
            onClick={() => {
              if (hasError) {
                Toast.fail('邮箱格式错误,请重新输入！', 2)
              }
            }}
          >
            <ItalicOutlined /> &nbsp;&nbsp;&nbsp;输入邮箱添加
          </div>
        </List.Item>
        <List.Item>
          <div
            className="aha-friend-adder-list-item"
            onClick={() => {
              input.current?.click()
            }}
          >
            <UploadOutlined /> 上传二维码添加
          </div>
        </List.Item>
        <List.Item>
          <div
            className="aha-friend-adder-list-item"
            onClick={() => {
              console.log('asdasd')
            }}
          >
            <ScanOutlined /> 扫描二维码添加
          </div>
        </List.Item>
      </List>
      {/* 上传图片解析二维码 */}
      <input
        ref={input}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) {
            const files = e.target.files
            console.log(files)
          }
        }}
      />
    </div>
  )
}
