// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'mmyzlcb-8bfe5d'
})
// 云函数入口函数
exports.main = async ({ id, time }, context) => {
  db.collection('msg').where({
    _id: id,
    time: time
  }).remove()
  return await db.collection('msg').get()
}
