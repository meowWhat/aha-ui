
import { ReactElement } from 'react'
import './VoipToolItem.less'

interface VoipToolItemProps {
  icon: ReactElement
  desp: string
  bgColor: string
  onClick?: () => void
}

export default function VoipToolItem(props: VoipToolItemProps) {
  const { icon, desp, bgColor, onClick } = props

  return (
    <div className="voip-tools-item" >
      <div
        className="voip-tool-item-icon"
        style={{ backgroundColor: bgColor }}
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          onClick && onClick()
        }}>
        {icon}
      </div>
      <div className="voip-toolitem-desp">
        {desp}
      </div>
    </div>
  )
}