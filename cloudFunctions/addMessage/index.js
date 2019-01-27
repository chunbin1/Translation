// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const msgDb = cloud.database({
  env: 'mmyzlcb-8bfe5d'
})
// 云函数入口函数
exports.main = async (event, context) => {
  let res = await msgDb.collection('msg').add({
    data:{
      name: event.name,
      content: event.content,
      time: event.time,
      avatar: event.avatar,
      city:event.city
    }
  })
  return await msgDb.collection('msg').get()
}