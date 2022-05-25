<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image.bannerId">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { getBanner } from 'api/api.js'
import { onMounted, reactive } from 'vue'
const state = reactive({
  images: []
})

onMounted(() => {
  getBanner().then((res) => {
    state.images = res.banners
  })
})

</script>

<style lang="scss">
.van-swipe {
  height: 135px;
  width: 100%;
  margin: 14px 0;
  border-radius: 10px;

  .van-swipe-item {
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
}
</style>
