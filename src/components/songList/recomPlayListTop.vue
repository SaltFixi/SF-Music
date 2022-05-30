<template>
  <div class="recom-paly-list-top">
    <!-- 背景虚化 -->
    <div class="bg-blur" :style="{ backgroundImage: 'url(' + coverImgUrl + ')' }"></div>
    <!-- 头部背景虚化 -->
    <div class="bg-head" :style="{
      backgroundImage: 'url(' + coverImgUrl + ')',
      filter: 'blur(' + blurnum + ')'
    }"></div>

    <div class="song-head" ref="songHead">
      <div class="c-p" @click="$router.go(-1)">
        <van-icon name="arrow-left" />
      </div>
      <div v-if="isShowNoticeTitle" class="title">歌单</div>
      <van-notice-bar v-else class="title2" scrollable :text="name" />
      <div class="search">
        <van-icon name="search" />
      </div>
    </div>

    <div class="song-box">
      <div class="box-lr">
        <img :src="coverImgUrl" alt="" />
      </div>
      <div class="box-rg">
        <div class="song-name">{{ '&nbsp;&nbsp;' + name }}</div>
        <!-- 凡是带有fmt的均在plugin/mixin下 -->
        <div class="song-desc">{{ fmt12Str(description) }}</div>
        <div class="author">
          <img :src="avatarUrl" alt="" />
          <span>{{ nickname }}</span>
          <i class="iconfont icon-tingge"></i>
          <span>{{ shareCount }}</span>
        </div>
      </div>
    </div>
    <IconList class="iconList" :data="songsList" FontBackground="#111" size="small" />
  </div>
</template>

<script>
import IconList from 'coms/IconList/IconList.vue'
import { songsList } from 'icon/iconList.js'
export default {
  components: {
    IconList
  },
  data () {
    return {
      coverImgUrl: '',
      name: '',
      nickname: '',
      avatarUrl: '',
      shareCount: '',
      description: '',
      blurnum: '15px',
      opacity: '1',
      isShowNoticeTitle: true,
      songsList: []
    }
  },
  props: ['playlist'],
  watch: {
    playlist (newVal) {
      const playlist = newVal
      console.log('歌单详情界面playlist', playlist);
      // this.$store.commit('setCurSongsList', playlist.tracks)
      this.coverImgUrl = playlist.coverImgUrl
      this.name = playlist.name
      this.nickname = playlist.creator.nickname
      this.avatarUrl = playlist.creator.avatarUrl
      this.shareCount = playlist.shareCount
      this.description = playlist.description
      this.songsList = songsList
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      // 头部虚化数随着页面的滚动变化
      const scrollTop = document.documentElement.scrollTop
      const _10to0 = 10 - scrollTop / 10
      let blurnum = _10to0
      if (blurnum <= 4) {
        blurnum = 4
        this.isShowNoticeTitle = false
      } else {
        // isShowNoticeTitle 表示歌单详情页滚轮到一定程度头部跑马灯的效果出来
        this.isShowNoticeTitle = true
      }
      this.blurnum = blurnum + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.recom-paly-list-top {
  margin-top: 60px;
}

.title2 {
  width: 100%;
  background: none;
  color: #fff;
}

.bg-blur {
  @include fixed();
  position: absolute;
  z-index: -1;
  height: 180px;
  filter: blur(15px);
}

.bg-head {
  @include fixed();
  top: -5px;
  z-index: 2;
  height: 60px;
  width: 100%;
  background-size: 100%;
  background-color: skyblue;
}

.song-head {
  @include flexSb();
  @include fixed();
  z-index: 2;
  width: 100%;
  height: 50px;
  color: #fff;
  fill: #fff;

  .title {
    font-size: 15px;
  }

  .van-icon {
    color: #fff;
  }

  .search {
    margin-right: 10px;
  }
}

.song-box {
  display: flex;
  margin: 15px;

  .box-lr img {
    border-radius: 6px;
    width: 100px;
    height: 100px;
  }

  .box-rg {
    position: relative;
    margin-left: 15px;

    .song-name {
      color: #fff;
      font-size: 13px;
    }

    .song-desc {
      color: #aaa;
      font-size: 9px;
      margin-top: 6px;
    }

    .author {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      font-size: 9px;
      color: rgba(255, 255, 255, 0.8);

      span {
        margin: 0 7px;
      }

      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }

      .icon-tingge {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}

.iconList {
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 5px;
}
</style>
