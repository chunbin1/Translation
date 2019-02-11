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
    isVoice:false,
    voiceObj:{},
    speakUrl:"",
    tSpeakUrl:""
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
  onShareAppMessage:function(){
    return {
      title:'翻译小助手',
      path:'pages/index/index',
imageUrl:'https://user-images.githubusercontent.com/19233912/52464542-384b1e00-2bb6-11e9-9bac-c7efa97dca07.jpg'
    }
  }
  ,
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
  onTapVoice:function(){
    if(this.data.isVoice===true){
     this.data.voiceObj.stop()
     return
    }
    this.setData({isVoice:!this.data.isVoice})
    if(this.data.voiceObj.src===this.data.tSpeakUrl){
      this.data.voiceObj.play()
      return
    }
    let voice = wx.createInnerAudioContext()
    voice.src = this.data.tSpeakUrl
    voice.onPlay(()=>{
      console.log('播放了')
    })
    voice.onStop(()=>{
      console.log("暂停咯")
      this.setData({ isVoice: !this.data.isVoice })
    })
    voice.onEnded(()=>{
      console.log("播放完毕")
      this.setData({ isVoice: !this.data.isVoice })      
    })
    this.setData({voiceObj:voice})
    voice.play()
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
      let {
        speakUrl,
        tSpeakUrl
      } = res;
      this.setData({
        'result': res.translation,
        'hideCopyBtn': false,
        'isVoice':false,
        speakUrl,
        tSpeakUrl
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