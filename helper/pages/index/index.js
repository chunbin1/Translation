//index.js
//获取应用实例
// import {translate} from '../../utils/api.js'
import {
  translate
} from '../../utils/youdao-api.js'
const app = getApp()

Page({
  data: {
    query: '',
    hideClearIcon: true,
    result: [],
    curLang: {},
    hideCopyBtn: true,
  },
  onLoad: function(options) {
    console.log('loaded..')
    console.log(options)
    if (options.query) {
      this.setData({
        query: options.query
      })
    }
  },
  onShow: function() {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
      this.setData({
        curLang: app.globalData.curLang
      })
      this.onConfirm()
    }
  },
  onInput: function(e) {
    this.setData({
      'query': e.detail.value
    })
    if (this.data.query.length > 0) {
      this.setData({
        'hideClearIcon': false
      })
    } else {
      this.setData({
        'hideClearIcon': true
      })
    }
    console.log('focus')
  },
  onTapClose: function() {
    this.setData({
      'hideClearIcon': true,
      'query': '',
      'result':'',
      'hideCopyBtn':true
    })
  },
  onTapCopy: function() {
    if (!this.data.query) {
      wx.showToast({
        title: '没有结果',
      })
      return
    }
    wx.setClipboardData({
      data: String(this.data.result),
      success: res => {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  onConfirm: function() {
    if (!this.data.query) return
    translate(this.data.query, {
      from: 'auto',
      to: this.data.curLang.lang
    }).then(res => {
      console.log("indexres", res)
      this.setData({
        'result': res.translation,
        'hideCopyBtn': false
      })

      let history = wx.getStorageSync('history') || []
      console.log(history)
      history.unshift({
        query: this.data.query,
        result: res.translation[0]
      })
      history.length = history.length > 10 ? 10 : history.length
      try {
        wx.setStorageSync('history', history)
      } catch (e) {
        console.log(e)
      }

    })
  }
})