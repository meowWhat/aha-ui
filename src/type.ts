export interface Req {
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