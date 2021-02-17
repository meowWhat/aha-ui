import { Req } from 'src/type'
import { service } from 'src/utils'
import { Modal } from 'antd-mobile'
export const isLogin = async () => {
  try {
    const data = await service.get<any, Req>('/login')
    if (data.statusCode === 200) {
      return data.message + ''
    } else {
      Modal.alert('', data.message)
      return false
    }
  } catch (_) {
    Modal.alert('', '服务器繁忙请稍后再试！')
    return false
  }
}
