<template>
  <subHead title="新歌" @handleMore="toNewSongList"></subHead>

  <van-skeleton title :row="5" :loading="loading">
    <van-swipe :loop="false" :width="320" :show-indicators="false" class="newSong">
      <newSongSwipeItem :newSongList="newSongList.slice(0, 3)" @play="handlePlay" />
      <newSongSwipeItem :newSongList="newSongList.slice(3, 6)" />
      <newSongSwipeItem :newSongList="newSongList.slice(6, 9)" />
    </van-swipe>
  </van-skeleton>
</template>

<script>
import subHead from 'coms/subHead/subHead.vue'
import newSongSwipeItem from 'coms/Swipe/newSongSwipeItem.vue'
import { getNewSong } from 'api/api.js';
export default {
  components: {
    subHead,
    newSongSwipeItem
  },
  data () {
    return {
      newSongList: [],
      loading: true
    }
  },
  async mounted () {
    let { result } = await getNewSong({ limit: 9 })
    this.newSongList = result
    this.loading = false
  },
  methods: {
    toNewSongList () {
      this.$router.push({ name: 'newSongList' })
    },
    handlePlay () {

    }
  }
};
</script>

<style lang="scss" scoped>
.newSong {
  height: 180px;
}
</style>
