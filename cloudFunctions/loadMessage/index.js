// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const msgDb = wx.cloud.database({
  env: 'mmyzlcb'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const msg = msgDb.collection('msg')
  return await msg.get()
}