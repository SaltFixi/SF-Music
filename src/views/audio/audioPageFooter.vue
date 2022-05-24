<template>
  <div class="container">
    <audio @canplay="getDuration" controls @timeupdate="updateTime" v-show="false" ref="audio" :src="audioSrc" />
    <div class="card">
      <div class="progress" ref="progress" @click="clickProgress" @mouseup="handleMouseup">
        <div class="currentProgress" ref="currentProgress">
          <span class="circle" ref="circle" @mousedown="handleMousedown"></span>
        </div>
      </div>
      <!-- 时间 -->
      <div class="time">
        <span class="startTime">{{ currentDuration }}</span>
        <span class="endTime">{{ duration }}</span>
      </div>
      <div class="option">
        <!-- 快退 -->
        <span class="pre" @click="handleBack">
          <i class="iconfont icon-kuaitui1" style="font-size: 20px"></i>
          <span style="color: #c7c7c9; font-size: 13px; margin-left: 10px">-{{ backSecond }}s</span>
        </span>

        <!-- 上一首 -->
        <i class="iconfont icon-shangyishou" @click="handlePreSong"></i>
        <!-- 是否播放 -->
        <span class="play" @click="handlePauseOrPlay">
          <i class="iconfont icon-zanting2" style="font-size:50px" v-show="!paused"></i>
          <i class="iconfont icon-yunhang" style="font-size:50px" v-show="paused"></i>
        </span>

        <!-- 下一首 -->
        <i class="iconfont icon-xiayishou" @click="handleNextSong"></i>

        <!-- 快进 -->
        <span class="next" @click="handleForward">
          <span style="color: #c7c7c9; font-size: 13px; margin-right: 10px">+{{ forwardSecond }}s
          </span>
          <i class="iconfont icon-kuaijin1" style="font-size: 20px"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    audioSrc: {
      type: String,
      default: ''
    },
    backSecond: {
      type: Number,
      default: 3
    },
    forwardSecond: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      duration: '00:00',
      currentDuration: '00:00',
      audio: '',
      paused: true,
      isMoveIn: false //是否在移动中
    }
  },
  computed: {
    ...mapState(['songslist', 'curSongsIndex'])
  },
  methods: {
    //后退
    handleBack () {
      if (this.audio.currentTime > this.backSecond) {
        this.audio.currentTime = this.audio.currentTime - this.backSecond
      }
    },
    //前进
    handleForward () {
      if (this.audio.duration - this.audio.currentTime > this.forwardSecond) {
        this.audio.currentTime = this.audio.currentTime + 10
      }
    },
    //暂停或播放
    handlePauseOrPlay () {
      this.audio.paused ? this.audio.play() : this.audio.pause()
      this.paused = !this.paused
    },
    //视频在可以播放时触发
    getDuration () {
      this.duration = this.timeFormat(this.$refs.audio.duration)
      this.audio = this.$refs.audio
    },
    //将单位为秒的的时间转换成mm:ss的形式
    timeFormat (number) {
      let minute = parseInt(number / 60)
      let second = parseInt(number % 60)
      minute = minute >= 10 ? minute : '0' + minute
      second = second >= 10 ? second : '0' + second
      return minute + ':' + second
    },
    //进度条发生变化时触发
    updateTime () {
      if (!this.$refs.progress) return
      this.$store.commit('setCurrentTime', this.audio.currentTime);
      this.currentDuration = this.timeFormat(this.audio.currentTime)
      //如果不是正在移动 和 没有暂停播放就执行
      if (!this.isMoveIn || !this.audio.paused) {
        // 设置当前时间
        let MoveX =
          this.$refs.progress.clientWidth *
          (this.audio.currentTime / this.audio.duration)
        //播放时更新距离
        this.$refs.currentProgress.style.width = MoveX + 'px'
        this.$refs.circle.style.left =
          MoveX - this.$refs.circle.clientWidth / 2 + 'px'
      }
    },
    //点击进度条更新进度
    clickProgress (e) {
      //如果不是正在移动 和 没有暂停播放就执行
      if (!this.isMoveIn || !this.audio.paused) {
        this.updateProgress(e.offsetX)
      }
    },
    //更新进度
    updateProgress (MoveX) {
      //当前移动的位置 = 当前移动的位置 / 当前进度条的可视长度    //this.$refs.progress.clientWidth 注意一定要拿总长度 否则会拿进度条已经走过的长度
      let clickProgress = MoveX / this.$refs.progress.clientWidth
      //设置播放的时间 = 总时长 * 当前点击的长度
      this.audio.currentTime = this.audio.duration * clickProgress
      //设置移动的位置
      this.$refs.currentProgress.style.width = MoveX + 'px'
      this.$refs.circle.style.left =
        MoveX - this.$refs.circle.clientWidth / 2 + 'px'
    },
    //鼠标弹起
    handleMouseup () {
      setTimeout(() => {
        this.audio.play()
        this.paused = false
        this.isMoveIn = false
      }, 200)
    },
    //小圆圈按下
    handleMousedown () {
      this.audio.pause()
      this.paused = true
      this.isMoveIn = true
      let progress = this.$refs.progress
      //进度条 左 边距离页面左边的距离 移动最小值
      let moveMin = progress.offsetParent.offsetLeft + progress.offsetLeft
      //进度条 右 边距离页面左边的距离 移动最大值
      let moveMax =
        progress.offsetParent.offsetLeft +
        progress.offsetLeft +
        progress.clientWidth
      //小圆圈的宽度
      let circleWidth = this.$refs.circle.clientWidth / 2
      let move = (move) => {
        if (move.pageX >= moveMax) {
          return
        } else if (move.pageX <= moveMin) {
          return
        }
        this.$refs.circle.style.left = move.pageX - moveMin - circleWidth + 'px'
        this.updateProgress(move.pageX - moveMin)
      }
      //获取当前鼠标的位置 X
      document.addEventListener('mousemove', move)
      //鼠标弹起来
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    },
    // 上一首
    handlePreSong () {
      console.log('handlePreSong');
      // this.$store.dispatch('getMusic', this.songslist[this.curSongsIndex - 1]);
      console.log(this.songslist[this.curSongsIndex - 1]);
    },
    // 下一首
    handleNextSong () {
      console.log('handleNextSong');
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 300px;
  padding: 10px;
  border-radius: 10px;

  .progress {
    height: 7px;
    border-radius: 3px;
    margin-bottom: 5px;
    width: 100%;
    background-color: #dadfea;
    cursor: pointer;

    .currentProgress {
      position: relative;
      height: 100%;
      width: 0;
      background-color: #3853fe;
      border-radius: 3px;

      .circle {
        position: absolute;
        right: -6px;
        top: -2px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #3853fe;
        background-color: #fff;

        &:hover {
          width: 12px;
          height: 12px;
          top: -3px;
          border-radius: 50%;
        }
      }
    }
  }

  .time {
    display: flex;
    justify-content: space-between;
    color: #777a85;
    font-size: 12px;
    color: #fff;
  }

  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .play,
    .pre,
    .next {
      display: flex;
      padding: 0 2px;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
