<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="banner in state.banners" :key="banner.bannerId">
      <img :src="banner.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { getBanner } from 'api/api.js'
import { onMounted, reactive } from 'vue'

const props = defineProps(['type'])
const state = reactive({
  banners: []
})

onMounted(() => {
  getBanner(props.type).then((res) => {
    state.banners = res.banners
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
