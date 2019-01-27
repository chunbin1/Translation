// pages/message/message.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: ['假装又点数据把', "有点数据2"],
    text:"测试一下setData会不会修改别饿",
    inputData:"",
    myColor:["#ff7e40", "#ff8700", "#bfae30", "#8742d6", "#37db79", "#fc3f4d", "#9c62d6", "#20805e", "#ffa073", "#35d59d", "#ff5300", "#769e25"]
  },
  fakeData(length) {
    let fakeDataArr = []
    for (let i = 0; i < length; i++) {
      fakeDataArr.push({
        name: "fake",
        avatar: "",
        content: "fake",
        city: "fake",
        time: this.formateTime(new Date()),
      })
    }
    return fakeDataArr
  },
  onScrollBottom:function(e){
    console.log(e)
    const newData =this.fakeData(5)
    this.setData({msg:[...this.data.msg,...newData]})
  },
  onScroll:function(e){

  },
  onDeleteMsg:function(e){
    console.log(e)
    const {name,index,time,id} = e.currentTarget.dataset
    if (app.globalData.userInfo.name !== name) return;
    wx.showModal({
      title: '请确认',
      content: '确认删除这条消息吗',
      success:(res)=>{
        // wx.cloud.init()
        if(res.confirm){
          wx.cloud.callFunction(
            {
              name: "deleteMessage",
              data:{
                id,
                time
              },
              success:(res)=>
              { 
                console.log(res)
                this.setData({msg: res.result.data.reverse()})}
            }
          )
        }
      }
    })
  },
  onGotUserInfo:function(e){
    console.log('ongotUserInfo', e)
    let detail = e.detail.userInfo;
    this.setData({
      userInfo: {
        name: detail.nickName,
        avatar: detail.avatarUrl,
        city: detail.city
      }
    })
    app.globalData.userInfo = this.data.userInfo;
    console.log(app.globalData.userInfo)
  },
  inputNewMsg:function(e){
    console.log(e.detail.value)
    this.setData({ inputData: e.detail.value})
  },
  formateTime(date) {
    let day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let time = date.toTimeString().slice(0, 8);
    return day + " " + time;
  },
  addMessage: function (e) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "addMessage",
      data:{
        name: app.globalData.userInfo.name,
        avatar: app.globalData.userInfo.avatar,
        content: this.data.inputData,
        city: app.globalData.userInfo.city,
        time: this.formateTime(new Date()),
      },
      success:res=>{
        this.setData({msg:res.result.data.reverse(),inputData:""})
        wx.showToast({
          title: "留言成功",
        })
      },
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
      success: res => {
        console.log(res)
        _this.setData({msg:res.result.data.reverse()})
      },
      fail: err => {
        console.log("调用loadMessage失败")
      },
      complete: () => {
        console.log('完成这次请求来')
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