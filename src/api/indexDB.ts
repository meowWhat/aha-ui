import { Modal } from 'antd-mobile'
import { ConversationObject, MessageObject } from 'src/type'

// 存放消息列表
const TB_MESSAGE = 'tb_message'
// 会话列表
const TB_CONVERSATION = 'tb_conversation'

class DataBase {
  static DB_NAME = 'aha-db'
  static DB_VERSION = 1
  private db!: IDBDatabase
  constructor() {
    if (!window.indexedDB) {
      Modal.alert('', '您的浏览器版本过低,无法继续浏览网站！！点击按钮前往谷歌浏览器官网,升级浏览器。', [
        {
          text: '确认',
          onPress() {
            window.location.href = 'https://www.google.com/intl/zh-CN/chrome/'
          },
        },
      ])
    }
  }

  public openDb() {
    return new Promise((reslove) => {
      const req = indexedDB.open(DataBase.DB_NAME, DataBase.DB_VERSION)
      req.onupgradeneeded = (evt) => {
        const db = (evt.target as typeof req).result
        const createStore = this.createStore.bind(this, db)
        createStore({ name: TB_MESSAGE, options: { autoIncrement: true } }, [
          {
            indexName: 'conversationId',
            paramters: { unique: false },
          },
        ])
        createStore({ name: TB_CONVERSATION, options: { keyPath: 'conversationId' } })
      }
      req.onsuccess = () => {
        this.db = req.result
        reslove(null)
        this.db.onerror = () => {
          Modal.alert('', '服务器繁忙请稍后再试', [
            {
              text: '确认',
              onPress() {
                window.location.href = 'https://www.jiahao.site/notFound'
              },
            },
          ])
        }
      }
      req.onerror = function () {
        Modal.alert('', "Why didn't you allow my web app to use IndexedDB?!", [
          {
            text: 'refresh',
            onPress() {
              window.location.href = 'https://www.jiahao.site/'
            },
          },
        ])
      }
    })
  }

  private createStore(
    db: IDBDatabase,
    { name, options }: { name: string; options: IDBObjectStoreParameters },
    indexs?: [{ indexName: string; paramters?: IDBIndexParameters }],
  ) {
    if (db.objectStoreNames.contains(name)) {
      db.deleteObjectStore(name)
    }
    const store = db.createObjectStore(name, options)
    indexs?.forEach(({ indexName, paramters }) => {
      store.createIndex(indexName, indexName, paramters)
    })
  }

  /**
   * 添加 message item 并更新活跃消息列表
   * @param msgObj
   * @param convObj
   */
  public addMessage(msgObj: MessageObject, convObj: ConversationObject) {
    return new Promise((reslove, reject) => {
      const msgRequest = this.db.transaction(TB_MESSAGE, 'readwrite').objectStore(TB_MESSAGE).add(msgObj)
      msgRequest.onsuccess = () => {
        reslove(null)
        this.db.transaction(TB_CONVERSATION, 'readwrite').objectStore(TB_CONVERSATION).put(convObj)
      }
      msgRequest.onerror = (err) => {
        reject(err)
      }
    })
  }

  public getMsgByConvId(convId: string, count?: number, direction: IDBCursorDirection = 'prev') {
    let index = 0
    const res: Required<MessageObject>[] = []
    return new Promise<Required<MessageObject>[]>((reslove) => {
      this.checkDb().then(() => {
        this.db
          .transaction(TB_MESSAGE, 'readonly')
          .objectStore(TB_MESSAGE)
          .index('conversationId')
          .openCursor(convId, direction).onsuccess = function () {
          const cursor = this.result
          if (cursor) {
            res.push({ id: cursor.primaryKey, ...cursor.value })
            index++
            if (index === count) {
              reslove(res)
              return
            }
            cursor.continue()
          } else {
            reslove(res)
          }
        }
      })
    })
  }

  public getConvList(count?: number, direction: IDBCursorDirection = 'prev') {
    let index = 0
    const res: ConversationObject[] = []
    return new Promise<ConversationObject[]>((reslove) => {
      this.checkDb().then(() => {
        this.db
          .transaction(TB_CONVERSATION, 'readonly')
          .objectStore(TB_CONVERSATION)
          .openCursor(null, direction).onsuccess = function () {
          const cursor = this.result
          if (cursor) {
            res.push(cursor.value)
            index++
            if (index === count) {
              reslove(res)
              return
            }
            cursor.continue()
          } else {
            reslove(res)
          }
        }
      })
    })
  }
  private checkDb() {
    if (!this.db) {
      return this.openDb()
    }
    return Promise.resolve()
  }
}

const db = new DataBase()

export { db }
