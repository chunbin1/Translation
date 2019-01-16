// pages/change/change.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    curLang:{},
    langList:app.globalData.langList
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({curLang:app.globalData.curLang})
  },
  onTapItem:function(e){
    let langObj = e.currentTarget.dataset
    wx.setStorageSync('language', langObj)
    this.setData({'curLang':langObj})
    app.globalData.curLang = langObj
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})