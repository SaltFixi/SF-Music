<template>
  <songListTop :coverImgUrl="coverImgUrl" title="新歌速递">
    <template #desc>
      <div class="desc">
        <div>新歌速递</div>
        <span>{{ time }}</span>
      </div>
    </template>
  </songListTop>
  <songListContent :songs="songs" />
  <songListFooter />
</template>

<script>
import dayjs from 'dayjs';
import songListTop from 'coms/songList/songListTop.vue'
import songListContent from 'coms/songList/songListContent.vue'
import songListFooter from 'coms/songList/songListFooter.vue'
import { reactive } from '@vue/reactivity';
import { getNewSong } from 'api/api.js';
import { onMounted, toRefs, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  components: {
    songListTop,
    songListContent,
    songListFooter
  },
  setup () {
    const state = reactive({
      coverImgUrl: '',
      songs: []
    })

    const time = ref(dayjs().format('YYYY年MM月DD日'))

    const store = useStore()
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
      store.commit('setSongslist', state.songs)

    })

    return {
      ...toRefs(state),
      time
    }
  }
};
</script>

<style lang="scss" scoped>
.desc {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>