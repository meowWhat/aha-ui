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
}

const validate = new Validator()

export default validate
