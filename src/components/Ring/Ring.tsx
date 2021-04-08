import Sound from 'react-sound'
import ReactDOM from 'react-dom'

const RING_TYPE = {
  getMsg: "http://img.tukuppt.com/newpreview_music/09/00/76/5c894b095237f81946.mp3",
  call: "http://img.tukuppt.com/newpreview_music/08/98/71/5c88b2aa99cb94486.mp3",
  scanOver: "http://img.tukuppt.com/newpreview_music/09/00/23/5c890e10a72b164168.mp3",
  hangUp: "http://img.tukuppt.com/newpreview_music/09/00/76/5c894b0934f9b36037.mp3",
  sendMsg: "http://img.tukuppt.com/newpreview_music/09/00/15/5c8904b4e3e1c39463.mp3"
} as const

export const ring = (type: keyof typeof RING_TYPE = 'getMsg') => {
  const div = document.createElement('div')

  document.body.appendChild(div)

  const destory = () => {

    const unmountResult = ReactDOM.unmountComponentAtNode(div)

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }

  ReactDOM.render(
    <Sound
      url={RING_TYPE[type]}
      playStatus="PLAYING"
      onFinishedPlaying={destory}
      onError={destory}
      loop={type === 'call'}
    />
    , div
  )

  return {
    destory
  }

}
