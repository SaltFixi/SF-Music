<template>
  <div class="video">
    <topNav title="视频" />

    <Swipe type="3" />

    <IconList :data="videoList" />

    <Footer />
  </div>
</template>

<script setup>
import topNav from 'coms/Layout/topNav.vue';
import Swipe from 'coms/Swipe/Swipe.vue'
import IconList from 'coms/IconList/IconList.vue'
import Footer from 'coms/Layout/Footer.vue';
import { videoList } from 'icon/iconList.js';

</script>

<style lang="scss" scoped>
.video {
  margin: 10px;
  margin-bottom: 120px;
}
</style>