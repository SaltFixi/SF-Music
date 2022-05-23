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
      <div class="title">新歌速递</div>
      <div></div>
    </div>

    <div class="song-box">
      <div class="box-lr">
        <img :src="coverImgUrl" alt="" />
      </div>
      <div class="box-rg">
        <div>新歌速递</div>
        <span>{{ time }}</span>
      </div>
    </div>
    <IconList class="iconList" :data="songsList" FontBackground="#111" size="small" />
  </div>

</template>

<script>
import dayjs from 'dayjs';
import IconList from 'coms/IconList/IconList.vue'
import { songsList } from 'icon/iconList.js'
import { reactive, ref, toRefs } from '@vue/reactivity';
export default {
  components: {
    IconList
  },
  props: ['coverImgUrl'],
  setup () {
    const state = reactive({
      songsList,
      // 虚化数默认为15px
      blurnum: '15px'
    })
    const time = ref(dayjs().format('YYYY年MM月DD日'))

    // 随着页面滚动虚化数逐渐变为0,或者说及负数
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const _10to0 = 10 - scrollTop / 10
      state.blurnum = _10to0 + 'px'
    }
    window.addEventListener('scroll', handleScroll)

    return {
      ...toRefs(state),
      time
    }
  },
};
</script>

<style lang="scss" scoped>
.top {
  margin-top: 60px;
}

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

  .box-lr img {
    border-radius: 6px;
    width: 100px;
    height: 100px;
  }

  .box-rg {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.iconList {
  background-color: #f7f7f7;
  border-radius: 15px;
  font-size: 10px;
  margin: 0 10px;
}
</style>