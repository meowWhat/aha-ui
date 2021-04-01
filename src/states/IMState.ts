import { makeAutoObservable } from 'mobx'

class IMState {
  public isOnline: boolean = false
  public converRenderFlag = false
  public inviteRenderFlag = false
  constructor() {
    makeAutoObservable(this)
  }
  public setOnline(value: boolean) {
    this.isOnline = value
  }
  public updateConv() {
    this.converRenderFlag = !this.converRenderFlag
  }
  public updateInvite() {
    this.inviteRenderFlag = !this.inviteRenderFlag
  }
}

const imState = new IMState()

export { imState, IMState }
