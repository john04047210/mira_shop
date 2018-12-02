import wepy from 'wepy';
import http from '../utils/http'

export default class auth {
  static async checkSession() {
    const storage = await wepy.getStorage({'key': 'openid'})
    if (!storage) {
      return false
    }
    const rst = await wepy.checkSession()
    if (rst.errMsg == 'checkSession:ok') {
      return true
    }
    return false
  }
  static async loginWepy() {
    let code = await wepy.login()
    let openid = await this.code2session(code.code)
    return openid
  }
  static async code2session(code) {
    let openid = null
    let url = `${wepy.$instance.globalData.domain}/api/jscode2session/${code}`;
    const header = {}
    header['APPID'] = wepy.$instance.globalData.appid
    const resp = await http.get(url, header)
    console.log(resp)
    if (resp.code == 0) {
      wepy.setStorageSync('openid', resp.data)
      openid = resp.data.openid
    }
    return openid
  }
}