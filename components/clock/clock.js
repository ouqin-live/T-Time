Component({
  data: {
    timeDisplay: '',
    dateDisplay: '',
    weekdayDisplay: '',
    isDayMode: true
  },

  lifetimes: {
    attached() {
      this.updateTime();
      // 每秒更新一次时间
      this.timer = setInterval(() => {
        this.updateTime();
      }, 1000);

      // 根据当前时间自动设置日夜模式
      const now = new Date();
      const hours = now.getHours();
      const newMode = hours >= 6 && hours < 18;
      this.setData({ isDayMode: newMode });
      this.triggerEvent('modeChange', newMode);
    },

    detached() {
      // 组件销毁时清除定时器
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  },

  methods: {
    updateTime() {
      const now = new Date();
      
      // 更新时间显示
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const timeDisplay = `${hours}:${minutes}:${seconds}`;
      
      // 更新日期显示
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const dateDisplay = `${year}年${month}月${date}日`;
      
      // 更新星期显示
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const weekdayDisplay = `星期${weekdays[now.getDay()]}`;
      
      this.setData({
        timeDisplay,
        dateDisplay,
        weekdayDisplay
      });
    },

    // 切换日夜模式
    toggleMode() {
      const newMode = !this.data.isDayMode;
      this.setData({
        isDayMode: newMode
      });
      this.triggerEvent('modeChange', newMode);
    }
  }
}); 