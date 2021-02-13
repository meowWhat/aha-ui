import './Emoji.less'
import { TabBar } from 'antd-mobile'
import { HeartOutlined, SmileOutlined, PlusOutlined, GifOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Emoji() {
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <TabBar tabBarPosition="top" prerenderingSiblingsNumber={0} className="emoji">
      <TabBar.Item
        icon={<SmileOutlined />}
        selectedIcon={<SmileOutlined className="green" />}
        selected={currentTab === 0}
        onPress={() => {
          setCurrentTab(0)
        }}
      >
        <ul>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
          <li>10</li>
        </ul>
      </TabBar.Item>
      <TabBar.Item
        icon={<GifOutlined />}
        selectedIcon={<GifOutlined className="green" />}
        selected={currentTab === 1}
        onPress={() => {
          setCurrentTab(1)
        }}
      >
        gif 图片
      </TabBar.Item>
      <TabBar.Item
        icon={<HeartOutlined />}
        selectedIcon={<HeartOutlined className="green" />}
        selected={currentTab === 2}
        onPress={() => {
          setCurrentTab(2)
        }}
      >
        收藏的表情包
      </TabBar.Item>
      <TabBar.Item
        icon={<PlusOutlined />}
        selectedIcon={<PlusOutlined className="green" />}
        selected={currentTab === 3}
        onPress={() => {
          setCurrentTab(3)
        }}
      >
        管理表情包
      </TabBar.Item>
    </TabBar>
  )
}
