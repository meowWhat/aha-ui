import './Linkman.less'
import { List, AutoSizer } from 'react-virtualized'
import img from 'src/img/logo.jpg'
import { generateBig_1 } from 'src/utils/word'
import { useState } from 'react'

const wordList = generateBig_1()

const list = [
  'Brian Vaughn',
  '2222',
  '3333n',
  '44hn',
  'Brian Vaughn',
  'Brian Vaughn',
  'Brian Vaughn',
  '2222',
  '3333n',
  '44hn',
  'Brian Vaughn',
  'Brian Vaughn',
  'Brian Vaughn',
  '2222',
  '3333n',
  '44hn',
  'Brian Vaughn',
  'Brian Vaughn',
]

const Linkman = () => {
  const [active, setActive] = useState(1)
  return (
    <div className="linkman">
      <AutoSizer>
        {({ height, width }) => (
          <List
            // 宽度
            width={width}
            // 高度
            height={height}
            // 渲染多少条数据
            rowCount={list.length}
            // 每条数据高度 动态计算
            rowHeight={50}
            // 渲染内容
            rowRenderer={({ key, style, index }) => {
              return (
                <div key={key} style={style} className="linkman-item">
                  <img src={img} alt="xx" className="linkman-item-avatar" />
                  <span className="linkman-item-nickname">{list[index]}</span>
                </div>
              )
            }}
          />
        )}
      </AutoSizer>
      <div className="linkman-nav">
        {wordList.map((word, index) => (
          <span
            key={index}
            onClick={() => {
              setActive(index)
              // 页面滚动
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

export default Linkman
