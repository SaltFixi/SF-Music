<template>
  <div class="top">
    <!-- 背景虚化 -->
    <div class="bg-blur" :style="{ backgroundImage: 'url(' + coverImgUrl + ')' }"></div>
    <div class="bg-head" :style="{
      backgroundImage: 'url(' + coverImgUrl + ')',
      filter: 'blur(' + blurnum + ')'
    }">
    </div>

    <div class="song-head">
      <!-- 返回图标 -->
      <div class="c-p" @click="$router.go(-1)">
        <van-icon name="arrow-left" color="#fff" />
      </div>
      <div class="title">{{ $route.meta.title }}</div>
      <div></div>
    </div>

    <div class="song-box">
      <div class="box-lr">
        <img :src="coverImgUrl" alt="" />
        <div class="playCount">
          <i class="iconfont icon-24gl-play" style="font-size:10px"></i>
          <span>{{ fmtPlayCount(playCount) }}</span>
        </div>
      </div>
      <div class="box-rg">
        <slot name="desc"></slot>
      </div>
    </div>
    <IconList class="iconList" :data="songsList" FontBackground="#111" size="small" />
  </div>

</template>

<script>
import IconList from 'coms/IconList/IconList.vue'
import { songsList } from 'icon/iconList.js'
import { reactive, toRefs } from '@vue/reactivity';
export default {
  components: {
    IconList
  },
  props: ['coverImgUrl', 'playCount'],
  setup () {
    const state = reactive({
      songsList,
      // 虚化数默认为15px
      blurnum: '15px'
    })
    // 随着页面滚动虚化数逐渐变为0,或者说及负数
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const _10to0 = 10 - scrollTop / 10
      state.blurnum = _10to0 + 'px'
    }
    window.addEventListener('scroll', handleScroll)

    return {
      ...toRefs(state),
    }
  },
};
</script>

<style lang="scss" scoped>
.top {
  margin-top: 60px;
}

/*-------------------背景虚化------------------------ */
.bg-blur {
  @include fixed();
  position: absolute;
  z-index: -1;
  height: 180px;
  width: 100%;
  background-size: 100%;
  filter: blur(15px);
}

.bg-head {
  @include fixed();
  top: -5px;
  z-index: 2;
  height: 60px;
  width: 100%;
  background-size: 100%;
  background-color: skyblue;
  filter: blur(15px);
}

/*------------------------------------------- */

.song-head {
  @include fixed();
  @include flexSb();
  color: #fff;
  fill: #fff;
  width: 100%;
  height: 50px;
  z-index: 2;

  .title {
    font-size: 18px;
    margin-right: 15px;
  }
}


.song-box {
  display: flex;
  margin: 15px;
  color: #fff;
  font-size: 16px;

  .box-lr {
    position: relative;

    img {
      border-radius: 6px;
      width: 100px;
      height: 100px;
    }

    .playCount {
      font-size: 10px;
      position: absolute;
      right: 10%;
      top: 0;
    }
  }

  .box-rg {
    margin-left: 15px;
  }
}

.iconList {
  background-color: #f7f7f7;
  border-radius: 15px;
  font-size: 10px;
  margin: 0 10px;
}
</style>