Component({
  data: {
    timeDisplay: '',
    dateDisplay: '',
    weekdayDisplay: '',
    period: '',
    is12Hour: false,
    isLandscape: false
  },

  lifetimes: {
    attached() {
      this.updateTime();
      // 每秒更新一次时间
      this.timer = setInterval(() => {
        this.updateTime();
      }, 1000);
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
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      // 处理12小时制
      if (this.data.is12Hour) {
        this.setData({
          period: hours >= 12 ? 'PM' : 'AM'
        });
        hours = hours % 12 || 12;
      }
      
      const timeDisplay = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
      
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

    toggleTimeFormat() {
      this.setData({
        is12Hour: !this.data.is12Hour
      }, () => {
        this.updateTime();
      });
    },

    toggleOrientation() {
      this.setData({
        isLandscape: !this.data.isLandscape
      });
    }
  }
}); 