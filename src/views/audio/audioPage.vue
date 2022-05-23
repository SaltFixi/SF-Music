<template>
  <div class="auido animate__animated animate__slideInUp">
    <div class="bg-blur" :style="{ backgroundImage: 'url(' + playingSong.alias.picUrl + ')' }"></div>
    <div class="bg2"></div>

    <header class="auido-head">
      <i class="iconfont icon-xiajiantou" @click="$router.go(-1)"></i>
      <i class="iconfont icon-fenxiangzhuanfa"></i>
    </header>

    <transition name="fade">
      <section v-show="!showLrc" @click="showLrc = true" class="audio-content">
        <div class="img-box">
          <img :src="playingSong.alias.picUrl" alt="">
        </div>

        <div class="audio-text">
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

    <transition name="fade">
      <div v-show="showLrc" @click="showLrc = false" class="showLrc-box">
        <ul>
          <li v-for="(item, i) in lyricList" :key="i">{{ item[1] }}</li>
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
    ...mapState(['playingSong', 'curMusicUrl', 'lyricList'])
  },
  methods: {

  },
  mounted () {
    console.log(this.lyricList);
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
      color: rgb(232, 225, 225);
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

