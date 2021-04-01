export interface Res {
  statusCode: number
  message: { [key: string]: any }
}

export type Dict<T> = { [key: string]: T }

export interface MessageObject {
  date: number
  content: string
  type: 'TEXT' | 'IMAGE'
  sendId: string
  conversationId: string
  id?: number
}

export interface ConversationObject {
  conversationId: string
  peerId: string
  text: string
  date: string
}

export interface ApiUserInfo {
  id: string
  nickname: string
  avatar: string
  sex: string
  birth: string
  email: string
  address: string
  sign: string
  comment: string
}

export interface InviteObject {
  userId: string
  isAccept: boolean
  key: string
}