// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    wx.getStorage({key:'history',success(res){
      let {data} = res
      _this.setData({ history: data})
    }})
    // this.setData({ history: wx.getStorageSync('history') }) 
    //同步写法
  },
  onTapItem: function (e) {
    console.log(e)
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}`
    })
  },
  onShareAppMessage: function () {

  }
})