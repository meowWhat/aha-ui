import { makeAutoObservable } from 'mobx'
import { ConversationObject } from 'src/type'

class IMState {
  public isOnline: boolean = false
  public convList: ConversationObject[] = []
  public converRenderFlag = false
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
          item.date = data.date
        }
      }
      if (!updated) {
        this.convList.push(data)
      }
    }
    this.convList = [...this.convList]
    this.converRenderFlag = !this.converRenderFlag
  }
}

const imState = new IMState()

export { imState, IMState }
