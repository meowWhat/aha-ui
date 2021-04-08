import ReactDOM from 'react-dom'
import { VoipToolItem } from 'src/components'
import { PoweroffOutlined, PhoneOutlined } from '@ant-design/icons'
import './Voip.less'

export const RenderVoip = (
  mode: 'call' | 'callee' | 'calling',
  info: {
    remark: string | undefined
    nickname: string
    avatar: string
  }
) => {
  const div = document.createElement('div')

  document.body.appendChild(div)

  const destory = () => {

    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }

  }


  ReactDOM.render(
    <div className="conversation-voip" >
      <div className="conversation-voip-user">
        <div className="conversation-voip-user-avatar">
          <img src={info.avatar} alt="" />
        </div>
        <div className="conversation-voip-user-info">
          {info.remark || info.nickname}
        </div>
        <div
          className="conversation-voip-user-tools"
          style={{
            gridTemplateColumns: mode === 'call'
              ? 'repeat(1, 1fr)'
              : 'repeat(2, 1fr)'
          }}
        >

          <VoipToolItem
            icon={<PoweroffOutlined color="#fff" />} bgColor="#dd4a48"
            desp="挂断"
            onClick={() => {
              // TODO
            }}
          />

          {
            mode === 'call' ?
              null :
              <VoipToolItem
                icon={<PhoneOutlined color="#fff" />} bgColor="green"
                desp="接听"
                onClick={() => {
                  // TODO
                }}
              />
          }
        </div>
      </div>
    </div>,
    div
  )

  return {
    destory
  }
}