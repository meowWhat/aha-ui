import { Toast } from 'antd-mobile'
import { validate } from 'src/utils'

/**
 * 处理 res.message 为{} Moda.alert 报错的情况
 * @param msg req.message
 * @param info 默认信息
 */
export const handleResMessage = (msg: any, info: string) => {
  let message = info
  if (validate.isString(msg)) {
    message = msg
  }
  Toast.fail(message)
}
