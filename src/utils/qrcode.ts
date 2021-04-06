import QC from 'qrcode'
import { handleErrorMsg } from 'src/api/resHandle'


class QRCode {

  public async generate(key: string) {
    try {
      const data = await QC.toDataURL(key, { errorCorrectionLevel: 'H', scale: 6, version: 2 })
      return data
    } catch (error) {
      handleErrorMsg(error, '二维码创建失败!')
    }
  }

}

const qrCode = new QRCode()

export {
  qrCode
}