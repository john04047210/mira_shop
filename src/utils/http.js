import wepy from 'wepy';

export default class http {
  static async request(url, method, data=null, header=null) {
    const param = {
      url: url,
      method: method
    }
    if (data) {
      param['data'] = data
    }
    if (header) {
      param['header'] = header
    }
    const res = await wepy.request(param)
    return res.data
  }

  static async get(url, header=null) {
    return this.request(url, 'GET', null, header)
  }

  static async post(url, data, header=null) {
    return this.request(url, 'POST', data, header)
  }
}