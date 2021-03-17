import './Linkman.less'
import img from 'src/img/logo.jpg'
import { generateBig_1 } from 'src/utils/word'
import { useState, useCallback, useEffect } from 'react'
import { Dict } from 'src/type'
import { withRouter, RouteComponentProps } from 'react-router'

export interface LinkmanListItem {
  avatar: string
  id: string
  nickName: string
  address?: string
  email?: string
  sex?: string
}
const wordList = generateBig_1()
let dataSourceKeys: string[]
const Linkman = (props: RouteComponentProps) => {
  const [active, setActive] = useState(1)
  const [dataSource, setDataSource] = useState<Dict<LinkmanListItem[]>>({})
  useEffect(() => {
    setDataSource({
      a: [
        {
          avatar: img,
          id: '0',
          nickName: '一号好友',
        },
        {
          avatar: img,
          id: '1',
          nickName: '二号好友',
        },
        {
          avatar: img,
          id: '2',
          nickName: '三号好友',
        },
        {
          avatar: img,
          id: '3',
          nickName: '4号好友',
        },
        {
          avatar: img,
          id: '4',
          nickName: '可聊天用户',
        },
        {
          avatar: img,
          id: '5',
          nickName: '6号好友',
        },
      ],
      b: [
        {
          avatar: img,
          id: '6',
          nickName: '一号好友',
        },
        {
          avatar: img,
          id: '7',
          nickName: '二号好友',
        },
        {
          avatar: img,
          id: '8',
          nickName: '三号好友',
        },
        {
          avatar: img,
          id: '9',
          nickName: '4号好友',
        },
        {
          avatar: img,
          id: '10',
          nickName: '5号好友',
        },
        {
          avatar: img,
          id: '11',
          nickName: '6号好友',
        },
      ],
      h: [
        {
          avatar: img,
          id: '12',
          nickName: '一号好友',
        },
        {
          avatar: img,
          id: '13',
          nickName: '三号好友',
        },
        {
          avatar: img,
          id: '15',
          nickName: '4号好友',
        },
        {
          avatar: img,
          id: '16',
          nickName: '5号好友',
        },
        {
          avatar: img,
          id: '17',
          nickName: '6号好友',
        },
      ],
      g: [
        {
          avatar: img,
          id: '22',
          nickName: '一号好友',
        },
        {
          avatar: img,
          id: '23',
          nickName: '三号好友',
        },
        {
          avatar: img,
          id: '25',
          nickName: '4号好友',
        },
        {
          avatar: img,
          id: '26',
          nickName: '5号好友',
        },
        {
          avatar: img,
          id: '27',
          nickName: '6号好友',
        },
      ],
      z: [
        {
          avatar: img,
          id: '31',
          nickName: '一号好友',
        },
        {
          avatar: img,
          id: '33',
          nickName: '三号好友',
        },
        {
          avatar: img,
          id: '35',
          nickName: '4号好友',
        },
        {
          avatar: img,
          id: '36',
          nickName: '5号好友',
        },
        {
          avatar: img,
          id: '37',
          nickName: '6号好友',
        },
      ],
    })
  }, [])
  const getList = useCallback(() => {
    dataSourceKeys = Object.keys(dataSource)
    return dataSourceKeys.map((key) => {
      const list = dataSource[key]
      return (
        <div key={key}>
          <h2 className="linkman-title">{key.toLocaleUpperCase()}</h2>
          {list.map(({ id, avatar, nickName, address, email, sex }, idx) => {
            const className = `linkman-item ${idx === list.length - 1 ? 'linkman-item-last' : ''}`
            return (
              <div
                key={id}
                className={className}
                onClick={() => {
                  props.history.push('/user/profile', {
                    nickName,
                    id,
                    avatar,
                    address,
                    email,
                    sex,
                  })
                }}
              >
                <img src={avatar} alt="xx" className="linkman-item-avatar" />
                <span className="linkman-item-nickname">{nickName}</span>
              </div>
            )
          })}
        </div>
      )
    })
  }, [dataSource, props.history])
  return (
    <div className="linkman">
      {getList()}
      <div className="linkman-nav">
        {wordList.map((word, index) => (
          <span
            key={index}
            onClick={() => {
              setActive(index)
              const _index = dataSourceKeys.indexOf(word.toLocaleLowerCase())
              const targetDom = document.getElementsByClassName('linkman-title')[_index] as any
              // 页面滚动
              let start: number = 0
              if (targetDom) {
                start = targetDom.offsetTop - targetDom.clientHeight * 2
              }
              window.scrollTo({
                top: start,
                behavior: 'smooth',
              })
            }}
            className={active === index ? 'green' : ''}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  )
}

export default withRouter(Linkman)
