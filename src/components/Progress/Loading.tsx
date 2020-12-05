/**
 * @Progress 网站进度条
 */

import './Loading.less'

/**
 * @flag 控制进度条的显示隐藏。
 */
interface Loading {
  flag: boolean | null
}

const Noodles = (props: Loading) => {
  const { flag } = props
  const getClssName = () => {
    let className = 'progress'
    if (flag) {
      className = `${className} progress-start`
    } else {
      className = `${className} progress-end`
    }
    return className
  }
  return <div className={getClssName()}></div>
}

export default Noodles
