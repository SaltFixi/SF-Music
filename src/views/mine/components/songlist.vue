<template>
  <!-- 收藏歌单 -->
  <div class="songlist">
    <!-- 创建歌单头部内容 -->
    <div class="flex a-c j-b">
      <span style="color:#bbb">创建歌单({{ songlist.length }}个)</span>
      <div style="color:#ccc">
        <van-icon name="plus" size="20" style="margin-right:10px" v-if="showPlus" />
        <van-icon name="ellipsis" size="20" style="transform:rotate(90deg)" />
      </div>
    </div>
    <!-- 创建歌单内容区域 -->
    <div class="songlist-content">
      <ul>
        <li v-for="(item, index) in songlist" :key="item.id">
          <div class="flex a-c" @click="$emit('toMySongList', { id: item.id, index: index })">
            <img :src="item.coverImgUrl" alt="">
            <div style="margin-left:10px">
              {{ item.name }}
              <div style="color:#bbb;font-size:10px">{{ item.trackCount }}首
                <span v-if="showNickName">，by {{ item.creator.nickname }}</span>
              </div>
            </div>
          </div>
          <van-icon name="ellipsis" size="20" style="transform:rotate(90deg);color: #bbb;" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songlist: {
      type: Array,
      require: true
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showNickName: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toMySongList']
};
</script>

<style lang="scss" scoped>
.songlist {
  width: 90%;
  padding: 15px 20px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.songlist-content {
  ul li {
    @include flexSb();
    margin: 10px 0;

    img {
      width: 45px;
      height: 45px;
      border-radius: 5px;
    }
  }
}
</style>