// helper/pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myDate:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let myLeaveDate = new Date(2019, 0, 15);
    let myDate = new Date()
    let timeSinceLeave = parseInt((myDate-myLeaveDate)/1000/3600/24)
    this.setData({ myDate: timeSinceLeave})
  },
  previewImage: function (e) { 
    console.log(e)
    let current = e.target.dataset.src;
    wx.previewImage({ current: current, urls: [current] }) 
    },
  onHelp:function(e){
   wx.navigateToMiniProgram({
     appId: 'wx18a2ac992306a5a4',
     path: 'pages/apps/largess/detail?id=S5RkXLhilUU%3D'
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