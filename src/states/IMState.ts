import { makeAutoObservable } from 'mobx'
import { ConversationObject } from 'src/type'

class IMState {
  public isOnline: boolean = false
  public convList: ConversationObject[] = []
  constructor() {
    makeAutoObservable(this)
  }
  public setOnline(value: boolean) {
    this.isOnline = value
  }
  public updateConv(data: ConversationObject[] | ConversationObject) {
    if (Array.isArray(data)) {
      this.convList = data
    } else {
      let updated = false
      for (let i = 0; i < this.convList.length; i++) {
        const item = this.convList[i]
        if (item.conversationId === data.conversationId) {
          updated = true
          item.text = data.text
        }
      }
      if (!updated) {
        this.convList.push(data)
      }
    }
  }
}

const imState = new IMState()

export { imState, IMState }
