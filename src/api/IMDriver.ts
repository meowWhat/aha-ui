import AgoraRTM, { RtmClient, RtmMessage } from 'agora-rtm-sdk'
import { Modal } from 'antd-mobile'
import { imState } from 'src/states/IMState'

class IM {
  private client: RtmClient
  private uid?: string
  private isOnline: boolean = false
  constructor() {
    this.client = AgoraRTM.createInstance('27dec015472841e19b0a1313404f87b6')
    this.client.on('ConnectionStateChanged', (newState) => {
      if (newState === 'CONNECTED') {
        this.isOnline = true
        imState.setOnline(true)
      } else {
        this.isOnline = false
        imState.setOnline(false)
      }
    })
  }
  public getClient() {
    return this.client
  }
  public onMessage(listener: (message: RtmMessage, perrId: string) => void) {
    this.client.on('MessageFromPeer', listener)
  }
  public login(uid: string) {
    this.uid = uid
    return new Promise((reslove, reject) => {
      this.client.login({ uid }).then(
        () => {
          reslove(null)
        },
        (err) => {
          console.log(`user ${uid} 登录失败,错误信息:\n${err}`)
          Modal.alert('', '抱歉!IM 服务器繁忙,请稍后再试!')
          reject()
        },
      )
    })
  }

  public logout() {
    return this.client.logout()
  }
  public sendMessage(text: string, targetId: string) {
    return new Promise((reslove, reject) => {
      if (this.isOnline === false) {
        reject('消息发送失败,IM 服务器连接失败!')
      }
      this.client
        .sendMessageToPeer(
          { text }, // 符合 RtmMessage 接口的参数对象
          targetId, // 远端用户 ID
        )
        .then((sendResult) => {
          if (sendResult.hasPeerReceived) {
            /* 远端用户收到消息的处理逻辑 */
            reslove(null)
          } else {
            /* 服务器已接收、但远端用户不可达的处理逻辑 */
            reject('服务器已接收,但远端用户离线!')
          }
        })
        .catch((error) => {
          /* 发送失败的处理逻辑 */
          console.log(error)
          reject('消息发送失败,请检查网络环境!')
        })
    })
  }
  /**
   * 检查 clinet 连接状态
   */
  public checkConnect() {
    return new Promise((reslove) => {
      if (this.uid) {
        this.client
          .queryPeersOnlineStatus([this.uid])
          .then((res) => {
            if (res[this.uid!] === true) {
              reslove(true)
            } else {
              reslove(false)
            }
          })
          .catch(() => {
            reslove(false)
          })
      }
    })
  }
}

const im = new IM()

export { im }
