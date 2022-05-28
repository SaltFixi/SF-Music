<template>
  <subHead title="热门推荐" />
  <horizontalSwipe :recomList="recomList" @clickTo="clickTo" />
</template>

<script>
import subHead from 'coms/subHead/subHead.vue'
import horizontalSwipe from 'coms/Swipe/horizontalSwipe.vue';
import { getVideoRecom } from 'api/api.js'
import { reactive, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';

export default {
  components: {
    subHead,
    horizontalSwipe
  },
  setup () {

    const state = reactive({
      recomList: []
    })

    getVideoRecom().then(({ result }) => {
      state.recomList = result
    })

    const router = useRouter()
    const clickTo = (id) => {
      router.push({ name: 'songsList', query: { playlistId: id } })
    }
    return {
      ...toRefs(state),
      clickTo
    }
  }
};
</script>

<style lang="scss" scoped>
</style>