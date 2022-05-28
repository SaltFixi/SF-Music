<template>
  <div class="home">
    <topNav />

    <Swipe type="1" />

    <IconList :data="homeList" />

    <Promotion />

    <recomPlayListSwipe />

    <newSongSwipe />

    <songListFooter style="bottom:60px" />
    <Footer />
  </div>
</template>

<script setup>
import topNav from 'coms/Layout/topNav.vue'
import Swipe from 'coms/Swipe/Swipe.vue'
import IconList from 'coms/IconList/IconList.vue'
import Promotion from 'views/home/components/Promotion.vue'
import { homeList } from 'icon/iconList.js'
import recomPlayListSwipe from './components/recomPlayListSwipe.vue';
import newSongSwipe from './components/newSongSwipe.vue';
import songListFooter from 'coms/songList/songListFooter.vue'
import Footer from 'coms/Layout/Footer.vue'
</script>

<style lang="scss" scoped>
.home {
  margin: 10px;
  margin-bottom: 120px;
}
</style>
