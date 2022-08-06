// pages/people/people.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canTap:true
  },

  onGotUserInfo:function(e){
    console.log('ongotUserInfo',e)
    let detail = e.detail.userInfo;
    this.setData({
      userInfo: {
        name: detail.nickName,
        avatar: detail.avatarUrl,
        city:detail.city
      }
    })
    app.globalData.userInfo = this.data.userInfo;
    console.log(app.globalData.userInfo)
  },
  // 加鸡腿功能暂时没办法使用
  onTapHelp:function(){
    console.log(this.data.canTap)
    if (this.data.canTap !== true) {
      return
    }
    this.data.canTap=false
    setTimeout(()=> {this.data.canTap=true},1000)
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=S5RkXLhilUU%3D'
    })
  }
})