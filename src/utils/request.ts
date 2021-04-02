import axios from 'axios'
import { handleErrorMsg } from 'src/api/resHandle'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.REACT_APP_BASE_API,
  // 超时
  timeout: 10000,
  withCredentials: true,
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        var part = encodeURIComponent(propName) + '='
        if (typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              let params = propName + '[' + key + ']'
              var subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    handleErrorMsg(message)
    return Promise.reject(message)
  },
)

export default service
