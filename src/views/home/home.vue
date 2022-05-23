<template>
  <div class="home">
    <topNav />

    <Swipe />

    <IconList :data="homeList" />

    <Promotion />

    <horizontalSwipe />

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
import horizontalSwipe from 'coms/Swipe/horizontalSwipe.vue'
import newSongSwipe from 'coms/Swipe/newSongSwipe.vue'
import songListFooter from 'coms/songList/songListFooter.vue'
import Footer from 'coms/Layout/Footer.vue'
</script>

<style lang="scss" scoped>
.home {
  margin: 10px;
  margin-bottom: 120px;
}
</style>
