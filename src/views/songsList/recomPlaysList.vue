<template>
  <recomPlayListTop :playlist="playlist" />
  <songListContent :songs="songs" />
  <songListFooter />
</template>

<script>
import recomPlayListTop from 'coms/songList/recomPlayListTop.vue'
import songListContent from 'coms/songList/songListContent.vue'
import songListFooter from 'coms/songList/songListFooter.vue'
import { onMounted, reactive, toRefs } from '@vue/runtime-core'
import { getPlayList, getPlayListTrack } from 'api/api.js'
import { useStore } from 'vuex';

export default {
  setup (props) {
    const state = reactive({
      playlist: {},
      songs: []
    })
    const { playlistId } = props
    const store = useStore()
    onMounted(async () => {
      const { playlist } = await getPlayList(playlistId)
      state.playlist = playlist
      store.commit('setPlaylist', state.playlist)

      let data = {
        id: playlistId,
      }
      // 传递给songs的数据需要修改一下毕竟
      // getNewSong的数据与getPlayListTrack的数据有所不同
      const { songs } = await getPlayListTrack(data)

      songs.forEach((item) => {
        state.songs.push({
          'name': item.name,
          'author': item.ar,
          'alias': item.al,
          'id': item.id,
        })
      })
      store.commit('setSongslist', state.songs)

    })
    return {
      ...toRefs(state)
    }

  },
  props: ['playlistId'],
  components: {
    recomPlayListTop,
    songListContent,
    songListFooter
  }
}

</script>

<style lang="scss" scoped>
</style>
