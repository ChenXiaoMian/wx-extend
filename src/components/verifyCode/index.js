// components/verifycode/index.js
var timer = null

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "请输入短信验证码"
    },
    column: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: "校验码已发送至您手机"
    },
    phone: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    isFocus: false,
    inputValue: '',
    codes: ['','','','','',''],
    countdown: 60,
    btnDisabled: false,
    btnText: '获取验证码',
    isIphone: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeView() {
      clearTimeout(timer)
      this.setData({ 
        isShow: false,
        isFocus: false,
        countdown: 60
      });
    },

    // 展示
    showView({ phone, inputSuccess }) {
      this.getSystemInfo()
      this.inputSuccess = inputSuccess;
      var mPhone = ''
      if (phone && phone != 'undefined') {
        mPhone = phone.substr(0, 3) + '****' + phone.substr(7);
      }
      this.setData({
        isShow: !this.data.isShow,
        isFocus: true,
        codes: ["", "", "", "", "", ""]
      })
      if (phone!='') {
        this.setData({
          phone: mPhone
        })
      }
      this.setTime()
      wx.hideLoading()
    },

    // 获取验证码
    getVerification() {
      this.setData({
        // isShow: !this.data.isShow,
        // phone: mPhone,
        isFocus: true,
        codes: ["", "", "", "", "", ""]
      })
      this.triggerEvent('regainCode')
      this.setTime()
    },
    
    /**
     * 点击输入框
     */
    openKeyboard: function () {
      this.setData({
        isFocus: true
      })
    },

    /**
     * 监听键盘输入
     */
    listenKeyInput(e) {
      var text = e.detail.value;
      var textLength = text.length;
      var codeArray = new Array();
      for (var i = 0; i < (textLength > 6 ? 6 : textLength); i++) {
        var code = text.substr(i, 1);
        codeArray[i] = (code);
      }
      for (var i = codeArray.length; i < 6; i++) {
        codeArray.push("");
      } 
      this.setData({
        codes: codeArray
      })
      if (textLength > 5) {
        var returnString = text.substr(0, 6);
        this.inputSuccess(returnString);
        this.setData({
          inputValue: ''
        });
      }
    },

    /**
     * 倒计时
     */
    setTime() {
      const _this = this
      var countdown = _this.data.countdown
      if (countdown <= 1) {
        this.setData({
          btnType: 'danger',
          btnDisabled: false,
          btnText: '获取验证码',
          countdown: 60
        })
        clearTimeout(timer)
      } else {
        countdown = countdown - 1
        this.setData({
          btnType: 'default',
          btnDisabled: true,
          btnText: `重新发送(${countdown}s)`,
          countdown: countdown
        })
        timer = setTimeout(function () {
          _this.setTime()
        }, 1000);
      }
    },
    /**
   * 根据设备判断显示
   */
    getSystemInfo() {
      const _this = this
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          _this.setData({
            systemInfo: res
          })
          if (res.platform == 'devtools') {
            // PC
            _this.setData({
              isIphone: true
            })
          } else if(res.platform == 'ios') {
            // IOS
            _this.setData({
              isIphone: true
            })
          } else if (res.platform == 'android') {
            // Android
            _this.setData({
              isIphone: false
            })
          }
        }
      })
    }
  }
})
