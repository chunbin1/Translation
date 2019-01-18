//index.js
//获取应用实例
import {translate} from '../../utils/api.js'
const app = getApp()

Page({
  data:{
    query:'',
    hideClearIcon:true,
    result:[],
    curLang:{}
  },
  onLoad:function(options){
    console.log('loaded..')
    console.log(options)
    if(options.query){
      this.setData({query:options.query})
    }
  },
  onShow:function(){
    if(this.data.curLang.lang!==app.globalData.curLang.lang){
      this.setData({curLang:app.globalData.curLang})
      this.onConfirm()
    }
  },
  onInput:function(e){
    this.setData({'query':e.detail.value})
    if(this.data.query.length>0){
      this.setData({'hideClearIcon':false})
    }else{
      this.setData({'hideClearIcon':true})
    }
    console.log('focus')
  },
  onTapClose:function(){
    this.setData({'hideClearIcon':true,'query':''})
  },
  onConfirm:function(){
    if(!this.data.query) return
    translate(this.data.query, { from: 'auto', to: this.data.curLang.lang}).then(res=>{
      this.setData({ 'result': res.trans_result})

      let history= wx.getStorageSync('history')||[]
      console.log(history)
      history.unshift({query:this.data.query, result:res.trans_result[0].dst})
      history.length = history.length>10?10:history.length
      try{
        wx.setStorageSync('history',history )
      }catch(e){
        console.log(e)
      }
      
    })
  }
})
