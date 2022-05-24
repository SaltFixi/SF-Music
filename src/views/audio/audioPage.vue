<template>
  <div class="auido animate__animated animate__slideInUp">
    <div class="bg-blur" :style="{ backgroundImage: 'url(' + playingSong.alias.picUrl + ')' }"></div>
    <div class="bg2"></div>

    <header class="auido-head">
      <i class="iconfont icon-xiajiantou" @click="$router.go(-1)"></i>
      <i class="iconfont icon-fenxiangzhuanfa"></i>
    </header>

    <!-- 歌曲信息部分 -->
    <transition name="fade">
      <section v-show="!showLrc" @click="showLrc = true" class="audio-content">
        <div class="img-box">
          <img :src="playingSong.alias.picUrl" alt="">
        </div>

        <div class="audio-text">
          <!-- 歌名 -->
          <div class="song-name">
            <h3 style="color:#fff">{{ playingSong.name }}</h3>
            <div class="standard">标准<i class="iconfont icon-xiajiantou"></i></div>
          </div>
          <!-- 作者 -->
          <div class="author">
            <div v-for="auth in playingSong.author" :key="auth.id">{{ auth.name }}</div>
          </div>
        </div>
        <IconList class="iconList" :data="palyingList" FontBackground="#fff" />
      </section>
    </transition>

    <!-- 歌词部分 -->
    <transition name="fade">
      <div v-show="showLrc" @click="showLrc = false" class="showLrc-box">
        <ul class="lrc">
          <li v-for="(item, i) in lyricList" :key="i">{{ item[1] }}</li>
        </ul>

        <!--没歌词的情况-->
        <ul v-show="!lyricList.length" class="no-lrc">
          <span>暂无歌词</span>
        </ul>
      </div>
    </transition>

    <footer class="auido-footer">
      <audioPageFooter class="audio-butt" :audioSrc="curMusicUrl" />
    </footer>
  </div>
</template>

<script>
import 'animate.css';
import { mapState } from 'vuex'
import IconList from 'coms/IconList/IconList.vue';
import audioPageFooter from './audioPageFooter.vue'
import { palyingList } from 'icon/iconList.js';
export default {
  data () {
    return {
      palyingList,
      showLrc: false
    }
  },
  components: {
    IconList,
    audioPageFooter
  },
  computed: {
    ...mapState(['playingSong', 'curMusicUrl', 'currentTime']),
    lyricList () {
      return this.$store.state.lyricList
    }
  },
  mounted () {
    console.log('lyricList', this.lyricList);
  },
  watch: {
    currentTime () {
      // console.log(this.currentTime);
      // 处理正播放的歌词
      if (this.lyricList.length !== 0) {
        for (let i = 0; i < this.lyricList.length; i++) {
          const lrc = document.querySelectorAll('.lrc li')
          // 判断当前歌曲播放的时间是否在 this.lyricList 的一个区间
          if (this.currentTime >= this.lyricList[i][0] &&
            this.currentTime <= this.lyricList[i + 1][0]) {
            // 在这个区间的话，就将其他区间的active类去除掉，保留这个区间的active类
            for (let j = 0; j < this.lyricList.length; j++) {
              if (lrc[j].classList.contains('active'))
                lrc[j].classList.remove('active')
              lrc[i].classList.add('active')
            }
          }
        }
      }
      // 处理正播放歌词的位置及滚动条
      // 由于给.showLrc-box类设置了overflow: scroll;所有要拿到它的类
      const showLrcBox = document.querySelector('.showLrc-box')
      const active = document.querySelector('.lrc li.active')
      if (active?.offsetTop > 260) {
        showLrcBox.scrollTop = active.offsetTop - 260
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/*----------------------背景-----------------------------*/
.bg-blur {
  @include fixed();
  z-index: -1;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(50px);
}

.bg2 {
  @include fixed();
  z-index: -1;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

/*---------------------------------------------------*/

.iconfont {
  font-size: 25px;
  color: #fff;
}

.auido {
  @include fixed();
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px 15px;
  color: #fff;

  .auido-head {
    @include flexSb();
  }

  .img-box {
    @include flexC();
    margin: 2% 0;
    transition: all 0.6s;

    img {
      width: 94%;
      height: 280px;
      border-radius: 10px;
    }
  }

  .audio-content {
    height: 70%;
  }

  .audio-text {
    padding: 10px;

    .song-name {
      @include flexSb();
    }

    .author {
      margin-top: 5px
    }

    .standard {
      @include flexSa();
      border: 2px solid #fff;
      border-radius: 5px;
      margin-top: 4px;
      width: 50px;

      .icon-xiajiantou {
        font-size: 10px;
      }
    }
  }


  .showLrc-box {
    @include fixed();
    top: 40px;
    margin: 0 auto;
    height: 72%;
    overflow: scroll;
    transition: all 0.6s;

    ul li {
      font-size: 15px;
      margin: 3px 0;
      text-align: center;
      color: rgb(183, 178, 178);
    }


    .active {
      font-size: 25px !important;
      color: #fff !important;
    }

    .no-lrc {
      @include fixed();
      top: 40%;
      text-align: center;
      font-size: 30px;
      color: #fff;
    }

  }


  .iconList {
    position: fixed;
    left: 0;
    bottom: 125px;
    width: 100%;
  }

  .auido-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    .audio-butt {
      @include flexC();
    }
  }

}

.animate__animated.animate__slideInUp {
  --animate-duration: 0.3s;
  // --animate-delay: 0.9s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> 

