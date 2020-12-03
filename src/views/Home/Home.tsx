import { TabBar } from 'antd-mobile'
import { useState } from 'react'
import * as urls from '../../img'
import './Home.less'

export const Home = () => {
  const [tab, setTab] = useState('message')

  const getIcon = (iconName: string) => {
    const temp: { [key: string]: string } = urls
    return (
      <div
        style={{
          width: '22px',
          height: '22px',
          background: `url(${temp[iconName]}) center center /  21px 21px no-repeat`,
        }}
      />
    )
  }

  return (
    <div id="home" style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar tabBarPosition="bottom" prerenderingSiblingsNumber={0}>
        <TabBar.Item
          title="消息"
          icon={getIcon('message2')}
          selectedIcon={getIcon('message')}
          selected={tab === 'message'}
          onPress={() => {
            setTab('message')
          }}
        >
          消息
        </TabBar.Item>
        <TabBar.Item
          title="联系人"
          icon={getIcon('lianxiren2')}
          selectedIcon={getIcon('lianxiren')}
          selected={tab === 'friend'}
          onPress={() => {
            setTab('friend')
          }}
        >
          联系人
        </TabBar.Item>
        <TabBar.Item
          title="动态"
          icon={getIcon('dongtai2')}
          selectedIcon={getIcon('dongtai')}
          selected={tab === 'dongtai'}
          onPress={() => {
            setTab('dongtai')
          }}
        >
          动态
        </TabBar.Item>
        <TabBar.Item
          title="我的"
          icon={getIcon('wode2')}
          selectedIcon={getIcon('wode')}
          selected={tab === 'wode'}
          onPress={() => {
            setTab('wode')
          }}
        >
          我的
        </TabBar.Item>
      </TabBar>
    </div>
  )
}
