<template>
  <van-tabbar class="footer" route v-model="active" active-color="#fc00ff">
    <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/video" icon="video-o">视频彩铃</van-tabbar-item>
    <van-tabbar-item replace to="/piazza" icon="friends-o">DIY广场</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="music-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { ref } from '@vue/reactivity';
export default {
  setup () {
    const active = ref(0);
    return { active };
  },
};
</script>

<style lang="scss" >
.footer {
  height: 60px;
}
</style>