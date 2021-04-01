import { Res } from 'src/type'
import service from 'src/utils/request'

class FriendService {
  public getFriends() {
    return service.get('/friend')
  }

  public addFriend(email: string) {
    return service.post<any, Res>('/friend/invite', { email })
  }

  public acceptFriend(userId: string, key: string) {
    return service.post<any, Res>('/friend', { userId, key })
  }

  public deletFriend(friend_id: string) {
    return service.delete('/friend', {
      data: { friend_id: friend_id }
    })
  }

}



const friendService = new FriendService()


export {
  friendService
}