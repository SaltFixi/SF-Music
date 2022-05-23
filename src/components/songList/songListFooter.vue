<template>
  <div class="songListFooter">
    <div class="content">
      <div class="content-left" @click="toAudio">
        <div class="playing-img">
          <img :src="playingSong.alias.picUrl" alt="">
        </div>
        <van-notice-bar class="playing-name" :text="playingSong.name" />
      </div>
      <div class="content-right">
        <i @click="palying" class="iconfont " :class="isShowPlayIcon ? 'icon-yunhang' : 'icon-zanting1'"></i>
        <i class="iconfont icon-bofangliebiao" style="padding:0 10px"></i>
      </div>
    </div>
    <!-- 音频 -->
    <audio ref="audio" :src="curMusicUrl"></audio>

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['playingSong', 'curMusicUrl', 'isShowPlayIcon']),
  },
  methods: {
    ...mapMutations(['setIsShowPlayIcon']),
    palying () {
      // 点击是否播放歌曲
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.setIsShowPlayIcon(false)
      }
      else {
        this.$refs.audio.pause()
        this.setIsShowPlayIcon(true)
      }
    },
    toAudio () {
      this.$router.push({ path: '/audio' })
    },
  },
  watch: {
    curMusicUrl () {
      this.$refs.audio.autoplay = true
      this.setIsShowPlayIcon(false)
    },
    // 页面跳转播放功能暂停
    // history () {
    // }
  },

};
</script>

<style lang="scss" scoped>
.songListFooter {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: -1px;
  left: 0;
  background-color: #fff;
  box-shadow: 4px 0 5px rgba(125, 124, 124, 0.2);
  z-index: 10;

  .content {
    @include flexSb();
    margin: 0 10px;
    height: 100%;

    .content-left {
      display: flex;
      width: 100%;

      .playing-name {
        width: 100%;
        background-color: #fff;
        color: rgb(97, 80, 80);
      }

      .playing-img {
        img {
          width: 40px;
          height: 40px;
          border-radius: 6px;
        }
      }
    }
  }


  .iconfont {
    color: #aaa;
    font-size: 30px;
  }
}
</style>