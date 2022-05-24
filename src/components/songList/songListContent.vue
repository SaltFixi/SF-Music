<template>
  <van-sticky :offset-top="50">
    <div class="head">
      <div class="head-lf">
        <i class="iconfont icon-bofang"></i>
        <span>全部播放 ({{ songs.length }}) </span>
      </div>
      <div class="head-rg">
        <van-icon name="descending" />
        <van-icon name="bars" />
      </div>
    </div>
  </van-sticky>

  <div class="song-body">
    <div class="song-item" @click="playingSong(item, index)" v-for="(item, index) in songs" :key="item.id">
      <div class="song-info">
        <!-- 凡是带有fmt的均在plugin/mixin下 -->
        <div class="song-name">{{ fmt30Str(item.name) }}</div>
        <div class="author-name">
          <!-- 作者是个数组可能有多个 -->
          <span v-for="auth in item.author" :key="auth.id">
            {{ auth.name + ' ' }}
          </span>
        </div>
      </div>
      <van-icon name="ellipsis" />
    </div>
  </div>

</template>

<script>

export default {
  props: ['songs'],
  methods: {
    // 切换歌曲会重新获取音乐,并将图标改为播放状态,将音乐列表的索引传过去后面切换歌曲的时候用到
    playingSong (item, index) {
      this.$store.dispatch('getMusic', item)
      this.$store.commit('setIsShowPlayIcon', true);
      this.$store.commit('setCurSongsIndex', index)
    }
  },
}

</script>

<style lang="scss" scoped>
.head {
  @include flexSb();
  background-color: #fff;
  height: 55px;
  z-index: 2;
  padding: 0 8px;

  .head-lf {
    display: flex;
    align-items: center;

    .icon-bofang {
      @include icon();
      cursor: pointer;
      font-size: 30px;
    }

    span {
      margin-left: 8px;
    }
  }

  .head-rg {
    @include flexSb();

    .van-icon:first-child {
      margin: 0 20px;
    }
  }
}

.song-body {
  padding: 0 10px;
  margin-bottom: 70px;

  .song-item {
    @include flexSb();
    height: 50px;
    font-size: 15px;
    margin: 15px 0;

    .author-name {
      font-size: 9px;
      color: #aaa;
      width: 150px;
      @include singleEllipses();
    }
  }
}

.van-icon {
  color: #666;
}
</style>
