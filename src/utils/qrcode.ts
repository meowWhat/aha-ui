import QC from 'qrcode'
import { Toast } from 'antd-mobile'

class QRCode {

  public async generate(key: string) {
    try {
      const data = await QC.toDataURL(key)
      return data
    } catch (error) {
      Toast.fail('二维码创建失败！')
    }
  }

}

const qrCode = new QRCode()

export {
  qrCode
}