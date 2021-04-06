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
      if (!/[a-z]/.test(nameKey)) {
        nameKey = '#'
      }
      const value = {
        avatar: res.avatar,
        id: friend_id + '',
        nickName: res.remark || res.nickname,
        address: res.address,
        email: res.email,
        sex: res.sex
      }
      if (!result[nameKey]) {
        result[nameKey] = []
      }
      result[nameKey].push(value)
    }))

    return result
  }

}



const friendService = new FriendService()


export {
  friendService
}