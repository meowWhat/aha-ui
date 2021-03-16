import { makeAutoObservable } from 'mobx'

class IMState {
  public isOnline: boolean = false
  public converRenderFlag = false
  constructor() {
    makeAutoObservable(this)
  }
  public setOnline(value: boolean) {
    this.isOnline = value
  }
  public updateConv() {
    this.converRenderFlag = !this.converRenderFlag
  }
}

const imState = new IMState()

export { imState, IMState }
