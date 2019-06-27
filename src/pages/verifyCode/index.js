// pages/verifyCode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 选择组件对象
    this.verifycode = this.selectComponent("#verifycode");
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

  },

  start() {
    // 弹出组件
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      _this.verifycode.showView({
        phone: "13800000000",
        inputSuccess: function (phoneCode) {
          //调用组件关闭方法
          _this.verifycode.closeView();
          //设置数据
          _this.setData({
            code: phoneCode
          });
          wx.showLoading({
            title: '加载中',
          })
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '提交成功',
            })
          }, 1000)
        }
      });
    }, 800)
  }
})