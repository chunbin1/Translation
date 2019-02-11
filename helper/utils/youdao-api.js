import md5 from './md5.min.js'

const appid = '776c13e8936efb4f'
const key = 'H95eg7NJMmtxJXL2Dbwf6EDEvCJsS3Mu'

// 百度api http://api.fanyi.baidu.com/api/trans/product/apidoc
// ={from:'auto',to:'en'}默认参数语法 如果只传from或者to则使用{ from = 'auto', to = 'en' }
// 目标语言不能为auto
function translate(q, { from = 'auto', to = 'zh' } = { from: 'auto', to: 'zh' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    if(to==='en'){
      to="EN"
    }
    console.log(to)
    wx.request({
      url: 'https://openapi.youdao.com/api',
      data: {
        q,
        from,
        to,
        appKey:appid,
        salt,
        sign
      },
      success(res) {
        console.log(res)
        if (res.data && res.data.translation) {
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