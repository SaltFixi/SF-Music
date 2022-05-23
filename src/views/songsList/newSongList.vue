<template>
  <newSongListTop :coverImgUrl="coverImgUrl" />
  <songListContent :songs="songs" />
  <songListFooter />
</template>

<script>
import newSongListTop from 'coms/songList/newSongListTop.vue'
import songListContent from 'coms/songList/songListContent.vue'
import songListFooter from 'coms/songList/songListFooter.vue'
import { reactive } from '@vue/reactivity';
import { getNewSong } from 'api/api.js';
import { onMounted, toRefs } from '@vue/runtime-core';
export default {
  components: {
    newSongListTop,
    songListContent,
    songListFooter
  },
  setup () {
    const state = reactive({
      coverImgUrl: '',
      songs: []
    })

    onMounted(async () => {
      const { result } = await getNewSong({ limit: 30 })

      state.coverImgUrl = result[0].picUrl

      result.forEach((item) => {
        state.songs.push({
          'name': item.song.name,
          'author': item.song.artists,
          'alias': item.song.artists[0],
          'id': item.id,
        })
      })
    })

    return {
      ...toRefs(state)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>