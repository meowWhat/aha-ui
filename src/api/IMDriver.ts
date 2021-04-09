import AgoraRTM, { RtmClient, RtmMessage, RtmEvents } from 'agora-rtm-sdk'
import { RenderVoip } from 'src/components'
import { appId } from 'src/config'
import { imState } from 'src/states/IMState'
import { getFriendInfo } from './cacheApi'
import { handleErrorMsg } from './resHandle'

export type RemoteInvitation = Parameters<
  RtmEvents.RtmClientEvents['RemoteInvitationReceived']
>[number]

class IM {
  static KEY = {
    // 添加好友
    INVITE: '@dzxc',
  }
  private client: RtmClient
  private uid?: string
  private isOnline: boolean = false
  private localInvitation?: ReturnType<RtmClient['createLocalInvitation']>
  private remoteInvitation?: RemoteInvitation

  constructor() {
    this.client = AgoraRTM.createInstance(appId!)
    // 链接状态管理
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
          handleErrorMsg(err, '抱歉!IM 服务器繁忙,请稍后再试!')
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

  /**
   * 添加好友
   */
  public inviteFriend(friendId: string, userId: string, key: string) {
    return this.sendMessage(
      this.encodeMsg(IM['KEY']['INVITE'], userId + '@' + key),
      friendId,
    )
  }

  /**
   * 检查消息是否为添加好友
   */
  public getInviteMsg(msg: RtmMessage) {
    if (msg.messageType === 'TEXT') {
      const decodeMsg = this.decodeMsg(IM['KEY']['INVITE'], msg.text)

      if (decodeMsg) {
        const split = decodeMsg.split('@')
        return {
          id: split[0],
          key: split[1],
        }
      }
    }
    return null
  }

  /**
   * 呼叫邀请
   */
  public call(
    calleeId: string,
    handle: {
      // 呼叫邀请被接受
      onAccept: () => void
      // 呼叫邀请被拒绝
      onRefused: () => void
      // 呼叫邀请被关闭
      onClose: () => void
    },
  ) {
    const { onAccept, onRefused, onClose } = handle
    // 初始化呼叫邀请对象
    this.localInvitation = this.client.createLocalInvitation(calleeId)

    this.localInvitation.on('LocalInvitationReceivedByPeer', () => {
      console.log('被叫收到呼叫邀请')
    })

    this.localInvitation.on('LocalInvitationCanceled', () => {
      onClose()
      console.log('呼叫邀请被取消')
    })

    this.localInvitation.on('LocalInvitationAccepted', () => {
      onAccept()
      console.log('被叫已接受呼叫要求')
    })

    this.localInvitation.on('LocalInvitationRefused', () => {
      onRefused()
      console.log('被叫已拒绝呼叫邀请')
    })

    this.localInvitation.on('LocalInvitationFailure', () => {
      onClose()
      console.log('呼叫邀请过程失败')
    })

    // 发送呼叫邀请
    this.localInvitation.send()
  }

  /**
   * 取消呼叫邀请
   */
  public cancelCall() {
    this.localInvitation && this.localInvitation.cancel()
  }

  public onCallee() {
    this.client.on('RemoteInvitationReceived', async (remoteInvitation) => {
      this.remoteInvitation = remoteInvitation

      const firendId = remoteInvitation.callerId
      const friendInfo = await getFriendInfo(firendId)

      RenderVoip(
        'callee',
        {
          remark: friendInfo.remark,
          avatar: friendInfo.avatar,
          friendId: friendInfo.id,
          nickname: friendInfo.nickname,
        },
        {},
        this.remoteInvitation,
      )
    })
  }

  /**
   * 接受呼叫邀请
   */
  public acceptCall() {
    this.remoteInvitation && this.remoteInvitation.accept()
  }

  /**
   * 拒绝呼叫邀请
   */
  public refuseCall() {
    this.remoteInvitation && this.remoteInvitation.refuse()
  }

  private encodeMsg(key: string, msg: string) {
    return `${key}${msg}${key}`
  }

  private decodeMsg(key: string, msg: string) {
    const regex = new RegExp(`^${key}(.*?)${key}$`)

    if (regex.test(msg)) {
      return msg.replace(regex, (_, p) => p)
    }

    return null
  }
}

const im = new IM()

export { im }
