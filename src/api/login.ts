import { Req } from 'src/type'
import { service } from 'src/utils'

export const isLogin = async () => {
  try {
    const data = await service.get<any, Req>('/login')
    console.log(data)

    if (data.statusCode === 200) {
      return true
    } else {
      return false
    }
  } catch (_) {
    return false
  }
}
