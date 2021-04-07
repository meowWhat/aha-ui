import { Dict, Res } from 'src/type'
import service from 'src/utils/request'

class ProfileService {

  private updateUserInfo(data: Dict<string | number>) {
    return service.put<any, Res>('/user/info', data)
  }

  public updateUserNickName(nickName: string) {
    return this.updateUserInfo({ nickname: nickName })
  }

  public updateUserSign(sign: string) {
    return this.updateUserInfo({ sign })
  }

  public updateAvatar(avatar: string) {
    return this.updateUserInfo({
      avatar
    })
  }

  public updateUserSex(sex: 0 | 1) {
    return this.updateUserInfo({ sex })
  }

}

const profileService = new ProfileService()

export {
  profileService
}