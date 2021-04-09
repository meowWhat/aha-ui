import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { VoipToolItem } from 'src/components'
import { PoweroffOutlined, PhoneOutlined } from '@ant-design/icons'
import './Voip.less'
import { ring } from '../Ring/Ring'
import { im, RemoteInvitation } from 'src/api/IMDriver'
import { handleErrorMsg } from 'src/api/resHandle'
import { rtc } from 'src/api/RTCDriver'
import { staticData } from 'src/states/StaticData'

type VoipMode = 'call' | 'callee' | 'calling'
export const RenderVoip = (
  mode: VoipMode,
  info: {
    remark: string | null
    nickname: string
    avatar: string
    friendId: string
  },
  handler?: {
    onHangUp?: () => void,
    onAccept?: () => void
  },
  remoteInvitation?: RemoteInvitation
) => {

  let destoryRing: () => void | undefined
  const div = document.createElement('div')

  document.body.appendChild(div)

  const destoryVoip = () => {

    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }

  }

  const Voip = () => {
    const [_mode, setMode] = useState<VoipMode>(mode)

    const handleClose = () => {
      destoryRing && destoryRing()
      ring('hangUp')
      destoryVoip()
      try {
        rtc.leaveCall()
      } catch (error) {

      }
    }

    useEffect(() => {
      if (_mode === 'call') {
        const { destory } = ring('call')
        destoryRing = destory
        im.call(info.friendId, {
          onAccept: () => {
            rtc.createCall(staticData.userId).then(() => {
              destoryRing()
              setMode('calling')
            }).catch(() => {
              handleClose()
            })

          },
          onClose: () => {
            handleErrorMsg('通话结束!')
            handleClose()
          },
          onRefused: () => {
            handleErrorMsg('通话邀请被拒绝!')
            handleClose()
          }
        })
      }

      if (_mode === 'callee' && remoteInvitation) {
        const { destory } = ring('call')
        destoryRing = destory

        rtc.onLeave(() => {
          handleErrorMsg('通话结束!')
          handleClose()
        })
        remoteInvitation.on('RemoteInvitationCanceled', () => {
          handleErrorMsg('主叫已取消呼叫邀请。!')
          handleClose()
        })

        remoteInvitation.on('RemoteInvitationFailure', () => {
          handleErrorMsg('通话结束!')
          handleClose()
        })

        remoteInvitation.on('RemoteInvitationAccepted', () => {
          rtc.createCall(staticData.userId).then(() => {
            destoryRing()
            setMode('calling')
          }).catch(() => {
            handleClose()
          })
        })


      }
    }, [_mode])

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
              handleClose()

              if (_mode === 'call') {
                im.cancelCall()
              } else if (_mode === 'callee') {
                im.refuseCall()
              }

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
                  destoryRing && destoryRing()
                  im.acceptCall()
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