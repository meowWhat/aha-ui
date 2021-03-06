import { RtmMessage } from 'agora-rtm-sdk'
import { staticData } from 'src/states/StaticData'
import { ApiUserInfo, ConversationObject, MessageObject, Res, ApiFriendInfo } from 'src/type'
import { DataBase, db } from 'src/api/indexDB'
import { imState, IMState } from 'src/states/IMState'
import { service } from 'src/utils'
import dayjs from 'dayjs'
import { im } from './IMDriver'

export const addMsg = (
  msg: RtmMessage,
  sendId: string,
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
    text,
    date: dayjs().format('MM月DD日 hh:mm'),
  }
  db.addMessage(msgObj, convObj).then(() => {
    imState.updateConv()
  })
}

export const getUserInfo: (id: string) => Promise<ApiUserInfo> = async (id: string) => {
  const data = window.localStorage.getItem(id)
  if (data) {
    service
      .post<any, Res>('/user/info', { id })
      .then((data) => {
        if (data.statusCode === 200) {
          window.localStorage.setItem(id, JSON.stringify(data.message[0]))
        }
      })
    return JSON.parse(data)
  } else {
    const data = await service.post<any, Res>('/user/info', { id })
    if (data.statusCode === 200) {
      window.localStorage.setItem(id, JSON.stringify(data.message[0]))
      return data.message[0]
    }
  }
}
export const getFriendInfo: (id: string, cache?: boolean) => Promise<ApiFriendInfo> = async (id: string, cache = true) => {
  const data = window.localStorage.getItem(id)
  if (data && cache) {
    service
      .post<any, Res>(`/friend/info`, { id })
      .then((data) => {
        if (data.statusCode === 200) {
          window.localStorage.setItem(id, JSON.stringify(data.message))
        }
      })
    return JSON.parse(data)
  } else {
    const data = await service.post<any, Res>('/friend/info', { id })
    if (data.statusCode === 200) {
      window.localStorage.setItem(id, JSON.stringify(data.message))
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

/**
 * 处理好友邀请
 * @param friendId 好友id
 */
export const handleInviteMsg = (friendId: string, key: string) => {
  db.addInviteItem(friendId, key).then(() => {
    imState.updateInvite()
  })
}

/**
 * 移除所有缓存
 */
export const removeAll = async () => {
  const firstStep = await new Promise((reslove) => {
    localStorage.clear()
    sessionStorage.clear()
    const res = indexedDB.deleteDatabase(DataBase['DB_NAME'])
    res.onsuccess = () => {
      reslove(true)
    }
    res.onerror = () => {
      reslove(false)
    }
    res.onblocked = (event) => {
      indexedDB.deleteDatabase(DataBase['DB_NAME'])
      reslove(true)
    }
  })
  im.logout()
  if (!firstStep) {
    return false
  }

  const res = await service.get<any, Res>('/user/logout')
  if (res.statusCode === 200) {
    return true
  }
  return res.message
}