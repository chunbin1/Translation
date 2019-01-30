import md5 from './md5.min.js'

const appid = '20180601000170703'
const key = 'uOaoMFPIBDFKcYR1Jsp6'

// 百度api http://api.fanyi.baidu.com/api/trans/product/apidoc
// ={from:'auto',to:'en'}默认参数语法 如果只传from或者to则使用{ from = 'auto', to = 'en' }
// 目标语言不能为auto
function translate(q, { from = 'auto', to = 'zh' } = { from: 'auto', to: 'zh' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate