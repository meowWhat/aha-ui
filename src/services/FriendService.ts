import { getFriendInfo } from 'src/api/cacheApi'
import { Dict, Res } from 'src/type'
import service from 'src/utils/request'
import { getFirstLetter } from 'src/utils/word'
import { LinkmanListItem } from 'src/views/Home/Linkman/Linkman'
class FriendService {
  public getFriends() {
    return service.get<any, Res>('/friend')
  }

  public addFriend(email: string) {
    return service.post<any, Res>('/friend/invite', { email })
  }

  public acceptFriend(key: string) {
    return service.post<any, Res>('/friend', { key })
  }

  public deletFriend(friend_id: string) {
    return service.delete('/friend', {
      data: { friend_id: friend_id }
    })
  }

  public async transformFriendList(list: Array<{ friend_id: number, remark: null | string, role: number }>) {
    const result: Dict<LinkmanListItem[]> = {
    }

    await Promise.all(list.map(async ({ friend_id, remark }) => {
      const res = await getFriendInfo(friend_id + '')
      let nameKey = getFirstLetter(remark || res.nickname)
      if (!(/[a-zA-Z]/.test(nameKey))) {
        nameKey = '#'
      } else {
        nameKey = nameKey.toLocaleUpperCase()
      }
      const value = {
        avatar: res.avatar,
        id: friend_id + '',
        nickName: res.nickname,
        remark: res.remark || '',
        address: res.address,
        email: res.email,
        sex: res.sex,
        sign: res.sign
      }
      if (!result[nameKey]) {
        result[nameKey] = []
      }
      result[nameKey].push(value)
    }))

    return result
  }

  /**
   * 更新好友备注,权限
   */
  public updateFriend(payload: {
    id: string
    role?: number
    remark?: string
  }) {
    return service.put<any, Res>('/friend', {
      "friend_id": payload.id,
      remark: payload.remark,
      role: payload.role
    })
  }
}



const friendService = new FriendService()


export {
  friendService
}