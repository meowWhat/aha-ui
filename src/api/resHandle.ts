import { Modal } from 'antd-mobile'
import { validate } from 'src/utils'

/**
 * @param msg req.message
 * @param info 默认信息
 */
export const handleErrorMsg = (msg: any, info: string = '') => {
  let message = info
  if (validate.isString(msg)) {
    message = msg
  }

  Modal.alert('', message)
}

export const handleSuccessMsg = (msg: string) => {

  Modal.alert('', msg)

}