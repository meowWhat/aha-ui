import { RtmMessage } from 'agora-rtm-sdk'
import { staticData } from 'src/states/StaticData'
import { ConversationObject, MessageObject, Req } from 'src/type'
import { db } from 'src/api/indexDB'
import { IMState } from 'src/states/IMState'
import { service } from 'src/utils'
import dayjs from 'dayjs'

export const addMsg = (
  msg: RtmMessage,
  sendId: string,
  peerId: string,
  conversationId: string,
  imState: IMState,
) => {
  const date = Date.now()
  let content: string = ''
  let type: MessageObject['type'] = 'TEXT'
  let text: string = ''
  if (msg.messageType === 'TEXT') {
    content = msg.text
    text = content.slice(0, 8)
    type = 'TEXT'
  } else if (msg.messageType === 'IMAGE') {
    content = msg.fileName
    type = 'IMAGE'
    text = '[图片]'
  }

  const msgObj: MessageObject = {
    content,
    conversationId,
    date,
    sendId,
    type,
  }
  const convObj: ConversationObject = {
    conversationId,
    peerId,
    text,
    date: dayjs().format('MM月DD日 hh:mm'),
  }
  db.addMessage(msgObj, convObj).then(() => {
    imState.updateConv()
  })
}

export const getUserInfo = async (id: string) => {
  const data = window.localStorage.getItem(id)
  if (data) {
    setTimeout(() => {
      service
        .post<any, Req>('/user/info', { id })
        .then((data) => {
          if (data.statusCode === 200) {
            window.localStorage.setItem(id, JSON.stringify(data.message[0]))
          }
        })
    })
    return JSON.parse(data)
  } else {
    const data = await service.post<any, Req>('/user/info', { id })
    if (data.statusCode === 200) {
      window.localStorage.setItem(id, JSON.stringify(data.message[0]))
      return data.message
    }
  }
}

export const getConvId = (friendId: string) => {
  return `${staticData.userId}@${friendId}`
}

export const getFriendIdByConvId = (convId: string) => {
  const users = convId.split('@')
  if (users[0] === staticData.userId) {
    return users[1]
  }
  return users[0]
}
