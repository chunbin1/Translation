// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: ['假装又点数据把', "有点数据2"]
  },

  logE: function (e) {
    console.log(e)
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "addMessage",
      complete: res => {
        console.log('aa', res)
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init()
    let _this = this
    wx.cloud.callFunction({
      name: "loadMessage",
      complete: res => {
        _this.setData({ meg: res })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})