<template>
  <subHead title="热门推荐" style="margin:20px 0" />

  <van-skeleton title :row="5" :loading="loading">
    <van-swipe class="swipe" :loop="false" :width="w" :show-indicators="false">
      <van-swipe-item v-for="(item, i) in recomList" :key="i">
        <div class="img-box">
          <img :src="item.data.coverUrl" alt="">
          <div class="img-title">{{ item.data.title }}</div>
          <div class="praised">
            <van-icon name="like" size="15" color="#fc695f" />
            <span>{{ item.data.praisedCount }}</span>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </van-skeleton>
</template>

<script>
import subHead from 'coms/subHead/subHead.vue'
import { getVideoRecom } from 'api/api.js'
import { reactive, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { onMounted, ref } from '@vue/runtime-core';

export default {
  components: {
    subHead,
  },
  setup () {

    const state = reactive({
      recomList: []
    })


    const loading = ref(true);
    const w = ref(window.screen.width / 2.6)

    window.addEventListener('resize', () => {
      w.value = parseInt((window.screen.width / 2.6))
    })

    onMounted(() => {
      getVideoRecom().then((res) => {
        w.value = parseInt((window.screen.width / 2.6))

        if (res.code == 200) {
          state.recomList = res.datas
          console.log(res.datas);
        }
      }, (err) => {
        console.log(err);
      })
      loading.value = false
    })

    const router = useRouter()
    const clickTo = (id) => {
      router.push({ name: 'songsList', query: { playlistId: id } })
    }
    return {
      w,
      loading,
      ...toRefs(state),
      clickTo
    }
  }
};
</script>

<style lang="scss" scoped>
.swipe {
  height: 150px;

  .img-box {
    position: relative;
    height: 150px;
    margin-right: 10px;

    img {
      border-radius: 8px;
      height: 100px;
    }

    .img-title {
      @include multEllipsis();
      margin: 10px 0;
    }

    .praised {
      position: absolute;
      bottom: 35%;
      left: 5%;
      color: #fff;
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 8px;
      background-color: rgba(146, 145, 145, 0.5);
    }
  }
}
</style>