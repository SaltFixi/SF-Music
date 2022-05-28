<template>
  <van-swipe-item class="newSong-items">
    <div class="newSong-item" v-for="item in newSongList" :key="item.id" @click="handlePlaying(item)">
      <div class="newSong-pic">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="newSong-desc">
        <div class="name">{{ item.name }}</div>
        <span class="author" v-for="auth in item.song.artists" :key="auth.id">{{ auth.name }}</span>
      </div>
    </div>
  </van-swipe-item>
</template>

<script>
export default {
  props: {
    newSongList: {
      type: Array,
      require: true
    },
  },
  methods: {
    handlePlaying (item) {
      const songItem = {
        alias: {
          name: item.song.name,
          picUrl: item.picUrl
        },
        author: item.song.artists,
        id: item.id,
        name: item.name
      }
      this.$emit('play')
      this.$store.dispatch('getMusic', songItem);
    }
  }
};
</script>

<style lang="scss" scoped>
.newSong-items {
  display: flex;
  flex-direction: column;
  height: 60px;

  .newSong-item {
    display: flex;
    margin: 5px 0;
  }

}

.newSong-pic {
  img {
    width: 50px;
    height: 50px;
    border-radius: 6px;
  }
}

.newSong-desc {
  margin-left: 20px;

  .author {
    font-size: 10px;
    color: #ccc;
  }
}
</style>
