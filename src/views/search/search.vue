<template>
  <van-search v-model.trim="keyword" @keydown.enter="onClickSeach" show-action placeholder="请输入搜索关键词">
    <template #left>
      <van-icon name="arrow-left" @click="$router.go(-1)" />
    </template>
    <template #action>
      <div @click="onClickSeach">搜索</div>
    </template>
  </van-search>

  <!-- 搜索历史 -->
  <div style="padding: 10px;margin-bottom: 35px;" v-if="!showSongs" v-show="showKeywordList">
    <h3 class="flex j-b a-c" style="font-style:oblique">
      <span>搜索历史</span>
      <i class="iconfont icon-shanchu" @click="delKeywordList"></i>
    </h3>
    <span class="search-history" @click="handleKeyword(item)" v-for="item in keywordList" :key="item">{{ item }}</span>
  </div>

  <!-- 热搜榜 -->
  <div style="padding: 10px;margin-bottom: 35px;" v-if="!showSongs">
    <h3 style="font-style:oblique">热搜榜</h3>
    <ul>
      <li v-for="(item, i) in hots" :key="i" class="hot-row" @click="handleHot(item.first)">
        <span class="rank" :style="{ color: clolrArr[i] }">{{ i + 1 }}</span>
        <div class="text">{{ item.first }}</div>
        <i class="iconfont icon-remen" style="color: red;font-size: 25px;" v-if="clolrArr[i]"></i>
      </li>
    </ul>
  </div>

  <songListContent :showSticky="false" :songs="songs" v-if="showSongs" />

  <songListFooter />
</template>

<script>
import { reactive } from '@vue/reactivity';
import { ref, onMounted, toRefs } from '@vue/runtime-core';
import { getSearchHot, getSearchKey } from 'api/api.js'
import songListFooter from 'coms/songList/songListFooter.vue';
import songListContent from 'coms/songList/songListContent.vue';
import { Toast } from 'vant';
import { useStore } from 'vuex';
import storage from 'utils/storage.js';
export default {
  components: {
    songListFooter,
    songListContent
  },
  setup () {
    let keyword = ref('')
    const state = reactive({
      hots: [],
      clolrArr: ['#fe6a57', '#ffa200', '#ffcf2d'],
      showSongs: false,
      songs: [],
      keywordList: [],
      showKeywordList: false
    })

    const store = useStore()
    const onClickSeach = async () => {
      // 每次点击搜索将songs清空
      state.songs = []
      if (keyword.value === '') {
        Toast({
          message: '无搜索关键词',
          position: 'bottom',
        });
        state.showSongs = false
        return
      }

      try {
        const { result: { songs } } = await getSearchKey(keyword.value)
        // console.log(songs);
        songs.forEach((item) => {
          state.songs.push({
            'name': item.name,
            'author': item.ar,
            'alias': item.al,
            'id': item.id
          })
        })
      } catch (error) {
        Toast({
          message: '没有查询到任何数据',
          position: 'bottom',
        });
        return
      }

      state.keywordList.unshift(keyword.value)
      // 数组去重
      state.keywordList = [...new Set(state.keywordList)]
      // 将keywordList存在本地storage中
      storage.set('keywordList', state.keywordList)

      store.commit('setSongslist', state.songs)
      state.showSongs = true
      state.showKeywordList = true
    }

    onMounted(() => {
      state.keywordList = storage.get('keywordList') ? storage.get('keywordList') : []
      storage.get('keywordList') ? state.showKeywordList = true : state.showKeywordList = false
      getSearchHot().then(({ result: { hots } }) => state.hots = hots)
    })

    // 处理热搜榜进行搜索
    const handleHot = (val) => {
      keyword.value = val
      onClickSeach()
    }

    // 点击搜索历史进行搜索
    const handleKeyword = (val) => {
      keyword.value = val
      onClickSeach()
    }

    // 删除所有搜索历史
    const delKeywordList = () => {
      state.keywordList = []
      storage.del('keywordList')
      state.showKeywordList = false
    }

    return {
      keyword,
      ...toRefs(state),
      onClickSeach,
      handleHot,
      handleKeyword,
      delKeywordList,
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-row {
  margin: 10px;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.rank {
  margin: 0 18px;
  color: #8b8b8b;
}

.text {
  border-bottom: 1px solid #eee;
  height: 45px;
  line-height: 45px;
  width: 100%;
}

.search-history {
  margin: 5px 10px;
  padding: 5px 15px;
  background-color: #e6e8e7;
  border-radius: 14px;
}
</style>