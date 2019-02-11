//app.js
const baiduArr = [
  {
    'chs': '英文',
    "lang": 'en',
    "index": 0
  },
  {
    'chs': '中文',
    'lang': 'zh',
    "index": 1
  },
  {
    'chs': '日语',
    'lang': 'jp',
    "index": 2
  },
  {
    'chs': '韩语',
    'lang': 'kor',
    "index": 3
  },
  {
    'chs': '法语',
    'lang': 'fra',
    "index": 4
  },
  {
    'chs': '西班牙语',
    'lang': 'spa',
    "index": 5
  },
  {
    'chs': '阿拉伯语',
    'lang': 'ara',
    "index": 6
  }
]
const youdaoArr =[
  {
    'chs': '英文',
    "lang": 'en',
    "index": 0
  },
  {
    'chs': '中文',
    'lang': 'zh-CHS',
    "index": 1
  },
  {
    'chs': '日语',
    'lang': 'ja',
    "index": 2
  },
  {
    'chs': '韩语',
    'lang': 'ko',
    "index": 3
  },
  {
    'chs': '法语',
    'lang': 'fr',
    "index": 4
  },
  {
    'chs': '西班牙语',
    'lang': 'es',
    "index": 5
  },
  {
    'chs': '阿拉伯语',
    'lang': 'ar',
    "index": 6
  }
]
App({
  onLaunch: function () {
    // 展示本地存储能力
    this.globalData.curLang = wx.getStorageSync('curLang')||this.globalData.langList[0]
  },
  globalData: {
    userInfo: null,
    curLang:{},
    langList: [
      ...youdaoArr
    ]
  },
  show:function(that,param,opacity){
    let animation = wx.createAnimation({
      //持续800s
    })
  }
})