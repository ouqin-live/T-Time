Page({
  data: {
    isDayMode: true
  },
  onLoad() {
    // 获取当前小时，设置初始模式
    const now = new Date();
    const hours = now.getHours();
    this.setData({
      isDayMode: hours >= 6 && hours < 18
    });
  },
  
  // 监听组件模式变化
  onClockModeChange(e) {
    this.setData({
      isDayMode: e.detail
    });
  }
}) 