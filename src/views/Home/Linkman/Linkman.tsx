import './Linkman.less'
import { generateBig_1 } from 'src/utils/word'
import { useState, useCallback, useEffect } from 'react'
import { Dict } from 'src/type'
import { withRouter, RouteComponentProps } from 'react-router'
import { friendService } from 'src/services'

export interface LinkmanListItem {
  avatar: string
  id: string
  nickName: string
  remark?: string
  address?: string
  email?: string
  sex?: 0 | 1
  sign?: string
}
const wordList = generateBig_1()
let dataSourceKeys: string[]
const Linkman = (props: RouteComponentProps) => {
  const [active, setActive] = useState(1)
  const [dataSource, setDataSource] = useState<Dict<LinkmanListItem[]>>({})
  useEffect(() => {
    friendService.getFriends().then((res) => {
      if (res.statusCode === 200) {
        friendService
          .transformFriendList(res.message as any)
          .then((dataSource) => {
            setDataSource(dataSource)
          })
      }
    })
  }, [])
  const getList = useCallback(() => {
    dataSourceKeys = Object.keys(dataSource)
    return dataSourceKeys.map((key) => {
      const list = dataSource[key]
      return (
        <div key={key}>
          <h2 className="linkman-title">{key.toLocaleUpperCase()}</h2>
          {list.map(
            ({ id, avatar, nickName, address, email, sex, remark }, idx) => {
              const className = `linkman-item ${
                idx === list.length - 1 ? 'linkman-item-last' : ''
              }`
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
                      remark,
                    })
                  }}
                >
                  <img src={avatar} alt="xx" className="linkman-item-avatar" />
                  <span className="linkman-item-nickname">
                    {remark || nickName}
                  </span>
                </div>
              )
            },
          )}
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
              const targetDom = document.getElementsByClassName(
                'linkman-title',
              )[_index] as any
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
