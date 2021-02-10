export interface Req {
  statusCode: number
  message: { [key: string]: any }
}

export type Dict<T> = { [key: string]: T }