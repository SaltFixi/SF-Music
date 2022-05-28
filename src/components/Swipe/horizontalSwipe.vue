<template>
  <van-skeleton title :row="5" :loading="loading">
    <van-swipe class="my-swipe" :loop="false" :width="w" :show-indicators="false">
      <van-swipe-item v-for="item in recomList" @click="clickTo(item.id)" :key="item.id">
        <div class="swipe-item">
          <div class="img-body">
            <img :src="item.picUrl" alt="" />
            <div class="img-stick-lf">
              <i class="iconfont icon-tingge"></i>
              <!-- 凡是带有fmt的均在plugin/mixin下 -->
              <span>{{ fmtPlayCount(item.playCount) }}</span>
            </div>
            <div class="img-stick-rg">
              <van-icon name="play-circle-o" color="#fff" size="22" />
            </div>
          </div>
          <span class="text">{{ item.name }}</span>
        </div>
      </van-swipe-item>
    </van-swipe>
  </van-skeleton>
</template>

<script setup>
import { onMounted, ref, defineEmits, defineProps } from '@vue/runtime-core'
defineProps({
  recomList: {
    type: Array,
    require: true
  }
})

const loading = ref(true);

onMounted(() => {
  loading.value = false
})

const w = ref(window.screen.width / 4)

window.addEventListener('resize', () => {
  w.value = parseInt((window.screen.width / 4))
})

const emit = defineEmits(['clickTo'])

const clickTo = (id) => {
  emit('clickTo', id)
}

</script>

<style lang="scss" scoped>
.my-swipe {
  height: 140px;
  font-size: 8px;

  .swipe-item {
    margin-right: 10px;

    .img-body {
      position: relative;
      color: #fff;

      img {
        border-radius: 7px;
        width: 100%;
      }
    }

    .img-stick-lf {
      position: absolute;
      z-index: 10;
      left: 0;
      bottom: 0;

      .icon-tingge {
        font-size: 14px;
        margin: 0 2px;
      }
    }

    .img-stick-rg {
      position: absolute;
      z-index: 10;
      right: 5px;
      bottom: 3px;
    }
  }

  .text {
    // 超出两行文本后续内容省略
    @include multEllipsis();
    width: 100%;
    overflow: hidden;
  }
}
</style>
