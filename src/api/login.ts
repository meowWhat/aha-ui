import { Res } from 'src/type'
import { service } from 'src/utils'

export const isLogin = async () => {
  try {
    const data = await service.get<any, Res>('/login')
    if (data.statusCode === 200) {
      return data.message + ''
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
