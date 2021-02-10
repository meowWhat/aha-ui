import './Item.less'

export interface ItemProps {
  left?: JSX.Element
  content: JSX.Element
  right?: JSX.Element
  onClick?: () => void
}
export default function Item(props: ItemProps) {
  const { left, content, right, onClick } = props
  const render = () => {
    if (left) {
      return (
        <div className="item" onClick={onClick}>
          <div className="item-left">{left}</div>
          <div className="item-content">
            <span>{content}</span>
            <span className="gray item-right">{right}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="item item-alone" onClick={onClick}>
          <div className="item-content">
            <span>{content}</span>
            <span className="gray item-right">{right}</span>
          </div>
        </div>
      )
    }
  }
  return render()
}
