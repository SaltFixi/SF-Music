<template>
  <songListTop :coverImgUrl="coverImgUrl" :playCount="desc.playCount">
    <template #desc>
      <div class="desc">
        <div>{{ desc.title }}</div>
        <div class="desc-bottom">
          <img :src="desc.creatorImg" alt="">
          <span>{{ desc.nickname }}</span>
        </div>
      </div>
    </template>
  </songListTop>
  <songListContent :songs="songs" />
  <songListFooter />
</template>

<script>
import songListTop from 'coms/songList/songListTop.vue'
import songListContent from 'coms/songList/songListContent.vue'
import songListFooter from 'coms/songList/songListFooter.vue'
import { reactive } from '@vue/reactivity';
import { getPlayListTrack } from 'api/api.js';
import { onMounted, toRefs } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
export default {
  components: {
    songListTop,
    songListContent,
    songListFooter
  },
  setup () {
    const state = reactive({
      coverImgUrl: '',
      songs: [],
      desc: {}
    })


    onMounted(async () => {
      const query = useRoute().query
      state.desc = query
      const { songs } = await getPlayListTrack({ id: query.id })
      state.coverImgUrl = songs[0].al.picUrl

      songs.forEach((item) => {
        state.songs.push({
          'name': item.name,
          'author': item.ar,
          'alias': item.al,
          'id': item.id,
        })
      })
    })

    return {
      ...toRefs(state),
    }
  },
};
</script>

<style lang="scss" scoped>
.desc {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .desc-bottom {
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    span {
      font-size: 10px;
      color: rgba(241, 237, 237, 0.714);
      margin-left: 8px;
    }
  }
}
</style>