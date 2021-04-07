import { handleErrorMsg } from 'src/api/resHandle'

class Validator {
  private emailReg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/
  isEmail(str: any) {
    if (this.isString(str, 5)) {
      return this.emailReg.test(str)
    }
    return false
  }
  isString(str: any, len = 0) {
    if (typeof str === 'string' && str.length > len) {
      return true
    }
    return false
  }
  validateLen(str: string, len: number) {
    if (typeof str !== 'string') {
      handleErrorMsg('格式错误,请输入字符串!')
      return false
    }
    if (str.length === 0) {
      handleErrorMsg('格式错误,请输入字符串!')
      return false
    }
    if (str.length > len) {
      handleErrorMsg('格式错误,长度不能超过' + len)
      return false
    }
    return true
  }
}

const validate = new Validator()

export default validate
