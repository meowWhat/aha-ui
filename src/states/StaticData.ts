import { ApiUserInfo } from 'src/type'

// 静态数据
class StaticData {
  public userId: string = ''
  public userInfo!: ApiUserInfo
}

const staticData = new StaticData()

export { staticData }
