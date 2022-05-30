<template>
  <subHead title="推荐歌单" />

  <van-skeleton title :row="5" :loading="loading">
    <horizontalSwipe :recomList="recomList" @clickTo="clickTo" />
  </van-skeleton>
</template>

<script>
import subHead from 'coms/subHead/subHead.vue'
import horizontalSwipe from 'coms/Swipe/horizontalSwipe.vue';
import { getRecomList } from 'api/api.js'
import { reactive, toRefs, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';

export default {
  components: {
    subHead,
    horizontalSwipe
  },
  setup () {

    const loading = ref(true);

    const state = reactive({
      recomList: []
    })


    onMounted(() => {
      getRecomList().then(({ result }) => {
        state.recomList = result
      })
      loading.value = false
    })


    const router = useRouter()
    const clickTo = (id) => {
      router.push({ name: 'recomPlaysList', query: { playlistId: id } })
    }
    return {
      ...toRefs(state),
      clickTo,
      loading
    }
  }
};
</script>

<style lang="scss" scoped>
</style>