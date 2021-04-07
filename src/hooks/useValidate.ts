import { useEffect, useState } from 'react'
import { isLogin } from 'src/api/login'
import { useHistory } from 'react-router-dom'
import { staticData } from 'src/states/StaticData'
import { addMsg, getConvId, getUserInfo, handleInviteMsg } from 'src/api/cacheApi'
import { IMState } from 'src/states/IMState'
import { im } from 'src/api/IMDriver'

export const useValidate = (imState: IMState) => {
  const history = useHistory()
  const [loginFlag, setLoginFlag] = useState(false)

  useEffect(() => {
    isLogin()
      .then((state) => {
        if (!state) {
          history.replace('/login')
        } else {
          staticData.userId = state
          // 抓取 userInfo
          return getUserInfo(staticData.userId)
        }
      })
      .then((userInfo) => {
        staticData.userInfo = userInfo!
        setLoginFlag(true)
        if (!imState.isOnline) {
          im.login(staticData.userId).then(() => {
            im.onMessage((msg, peerId) => {
              const res = im.getInviteMsg(msg)
              if (res) {
                handleInviteMsg(res.id, res.key)
              } else {
                const convId = getConvId(peerId)
                addMsg(msg, peerId, convId, imState)
              }
            })
          })
        }
      })
  }, [imState, history])

  return {
    loginFlag,
    setLoginFlag
  }
}