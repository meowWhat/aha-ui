import { useState } from 'react'
import ReactDOM from 'react-dom'
import { VoipToolItem } from 'src/components'
import { PoweroffOutlined, PhoneOutlined } from '@ant-design/icons'
import './Voip.less'
import { ring } from '../Ring/Ring'

type VoipMode = 'call' | 'callee' | 'calling'
export const RenderVoip = (
  mode: VoipMode,
  info: {
    remark: string | undefined
    nickname: string
    avatar: string
  },
  handler?: {
    onHangUp?: () => void,
    onAccept?: () => void
  }
) => {

  let destoryRing: () => void | undefined
  const div = document.createElement('div')

  document.body.appendChild(div)

  if (mode !== 'calling') {
    const { destory } = ring('call')
    destoryRing = destory
  }

  const destoryVoip = () => {

    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }

  }

  const Voip = () => {
    const [_mode, setMode] = useState<VoipMode>(mode)

    return <div className="conversation-voip" >
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
            gridTemplateColumns: _mode === 'callee'
              ? 'repeat(2, 1fr)'
              : 'repeat(1, 1fr)'
          }}
        >

          <VoipToolItem
            icon={<PoweroffOutlined color="#fff" />} bgColor="#dd4a48"
            desp="挂断"
            onClick={() => {
              const cb = handler?.onHangUp
              cb && cb()
              ring('hangUp')
              destoryVoip()
            }}
          />

          {
            _mode === 'callee'
              ? <VoipToolItem
                icon={<PhoneOutlined color="#fff" />} bgColor="green"
                desp="接听"
                onClick={() => {
                  const cb = handler?.onAccept
                  cb && cb()
                  setMode('calling')
                  destoryRing()
                }}
              />
              : null
          }
        </div>
      </div>
    </div>
  }


  ReactDOM.render(
    <Voip />,
    div
  )

  return {
    destory: destoryVoip
  }
}