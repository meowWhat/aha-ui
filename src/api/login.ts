import { Res } from 'src/type'
import { service } from 'src/utils'
import { handleErrorMsg } from './resHandle'

export const isLogin = async () => {
  try {
    const data = await service.get<any, Res>('/login')
    if (data.statusCode === 200) {
      return data.message + ''
    } else {
      handleErrorMsg(data.message, '登陆失败')
      return false
    }
  } catch (error) {
    handleErrorMsg('服务器繁忙请稍后再试！')
    return false
  }
}
