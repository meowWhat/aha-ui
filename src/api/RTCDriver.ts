import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng'
import { appId } from 'src/config'

class RTC {
  private client: IAgoraRTCClient
  private localAudioTrack!: IMicrophoneAudioTrack
  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })
    AgoraRTC.setLogLevel(3)
    this.client.on('user-published', async (user, mediaType) => {
      // 开始订阅远端用户。
      await this.client.subscribe(user, mediaType)
      console.log('subscribe success')

      // 表示本次订阅的是音频。
      if (mediaType === 'audio') {
        // 订阅完成后，从 `user` 中获取远端音频轨道对象。
        const remoteAudioTrack = user.audioTrack
        // 播放音频因为不会有画面，不需要提供 DOM 元素的信息。
        remoteAudioTrack && remoteAudioTrack.play()
      }
    })
  }
  public async test(userId: string) {
    try {
      await this.client.join(appId!, 'demo', null, userId)
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
      await this.client.publish([this.localAudioTrack])

      console.log('publish success')
    } catch (error) {
      console.log('publish error', error)
    }
  }
  public async leaveCall() {
    this.localAudioTrack.close()
    await this.client.leave()
  }
}

export const rtc = new RTC()
