<template>
  <div class="mine">
    <topNav title="我的">
      <template #rg>
        <div style="color:#aaa;">
          <van-icon name="envelop-o" style="margin-right:20px;" />
          <van-icon name="setting-o" @click="showPopup = true" />
        </div>
      </template>
    </topNav>

    <van-popup v-model:show="showPopup" position="bottom" :style="{ height: '20%' }">
      <van-button class="setting-btn" color="#C3A9F6" block @click="$router.push({ name: 'login' })">切换账号</van-button>
      <van-button class="setting-btn" color="#C3A9F6" block @click="logout">退出登录</van-button>
    </van-popup>


    <!-- 没有登录 -->
    <div class="flex a-c c-p" style="margin:25px 0" v-if="!loginState" @click="$router.push({ name: 'login' })">
      <div class="userIcon">
        <i class="iconfont icon-icon-user"></i>
      </div>
      <h3 style="margin-left:10px">未登录</h3>
    </div>
    <!-- 登录了 -->
    <div class="flex a-c j-b c-p" style="margin:25px 0" v-else>
      <div class="flex">
        <img class="userIcon" :src="userProfile.avatarUrl" alt="">
        <div class="info">
          <strong style="font-size:18px">{{ userProfile.nickname }}</strong>
          <div>
            <span style="margin-right:15px">{{ userProfile.follows }} 关注</span>
            <span>{{ userProfile.followeds }} 粉丝</span>
          </div>
        </div>
      </div>
      <div class="sign-in"><i class="iconfont icon-qiandao" style="font-size:18px"></i>
        <strong> 签到送好礼</strong>
      </div>
    </div>


    <IconList :data="mineList1" FontBackground="#A3B4FD" class="mineList1" />
    <IconList :data="mineList2" FontBackground="#A3B4FD" class="mineList2" />


    <h3 style="margin:20px 0">我的喜欢</h3>
    <div class="love-music">
      <div class="flex" @click="toLoveMusic(loveMusic.id)">
        <img class="love-img" :src="loveMusic.coverImgUrl" alt="">
        <div>
          <div>{{ loveMusic.name ? loveMusic.name : '喜欢的音乐' }}</div>
          <span style="color:#bbb;font-size:10px">{{ loveMusic.trackCount ? loveMusic.trackCount : 0 }}首， </span>
          <span style="color:#bbb;font-size:10px">已下载{{ loveMusic.specialType ? loveMusic.specialType : 0 }}首</span>
        </div>
      </div>
      <div class="FM">私人FM</div>
    </div>

    <!-- 创建歌单 -->
    <h3 style="margin:20px 0">歌单</h3>
    <songlist :songlist="createPlaylist" @toMySongList="toCreatePlaylist" />
    <songlist :songlist="collectPlaylist" :showPlus="false" :showNickName="true" @toMySongList="toCollectPlaylist" />

    <songListFooter style="bottom:60px" />
    <Footer />
  </div>
</template>

<script>
import topNav from 'coms/Layout/topNav.vue';
import Footer from 'coms/Layout/Footer.vue';
import IconList from 'coms/IconList/IconList.vue';
import songListFooter from 'coms/songList/songListFooter.vue';
import songlist from './components/songlist.vue';
import { userPlaylist } from 'api/api.js';
import { mineList1, mineList2 } from 'icon/iconList.js';
import { mapState } from 'vuex';
import storage from 'utils/storage.js';
export default {
  components: {
    Footer,
    topNav,
    IconList,
    songListFooter,
    songlist
  },
  computed: {
    ...mapState('userInfo', ['loginState', 'userProfile', 'userId'])
  },
  data () {
    return {
      mineList1,
      mineList2,
      showPopup: false,
      loveMusic: {},
      createPlaylist: [],
      collectPlaylist: []
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('userInfo/cleanInfo');
      storage.del('userInfo')
      this.showPopup = false
      this.$router.go(0)
    },
    toLoveMusic (id) {
      const query = {
        'id': id,
        'title': this.loveMusic.name,
        'nickname': this.loveMusic.creator.nickname,
        'creatorImg': this.loveMusic.creator.avatarUrl,
        'playCount': this.loveMusic.playCount
      }
      this.$router.push({ name: 'mySongList', query: query })
    },
    toCreatePlaylist ({ id, index }) {
      const query = {
        'id': id,
        'title': this.createPlaylist[index].name,
        'nickname': this.createPlaylist[index].creator.nickname,
        'creatorImg': this.createPlaylist[index].creator.avatarUrl,
        'playCount': this.createPlaylist[index].playCount
      }
      this.$router.push({ name: 'mySongList', query: query })
    },
    toCollectPlaylist ({ id, index }) {
      const query = {
        'id': id,
        'title': this.collectPlaylist[index].name,
        'nickname': this.collectPlaylist[index].creator.nickname,
        'creatorImg': this.collectPlaylist[index].creator.avatarUrl,
        'playCount': this.collectPlaylist[index].playCount
      }
      this.$router.push({ name: 'mySongList', query: query })
    }
  },
  watch: {
    loginState: {
      deep: true,
      immediate: true,
      handler: function () {
        // 监听是否登录了，如果登录了处理数据
        if (this.loginState) {
          userPlaylist(this.userId).then(res => {
            console.log('userPlaylist', res);
            this.loveMusic = res.playlist[0]
            res.playlist.forEach((item) => {
              if (item.userId === this.userId) {
                this.createPlaylist.push(item)
              } else {
                this.collectPlaylist.push(item)
              }
            })
            // 删除第一项数据
            this.createPlaylist.shift()
          })
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mine {
  padding: 15px;
  margin-bottom: 100px;
  background-color: #fbf6f6;
}

.userIcon {
  @include flexC();
  width: 50px;
  height: 50px;
  color: #fff;
  border-radius: 50%;
  background-color: #f6e4e4;
}

.mineList1,
.mineList2 {
  width: 100%;
  height: 90px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
}

.info {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
}

.sign-in {
  width: 100px;
  height: 23px;
  line-height: 20px;
  text-align: center;
  color: #C3A9F6;
  border-radius: 10px;
  border: 2px solid #C3A9F6;
}

.setting-btn {
  width: 90%;
  margin: 15px auto;
  border-radius: 6px;
}

.love-music {
  @include flexSb();
  width: 100%;
  height: 70px;
  margin: 10px 0;
  background-color: #fff;
  border-radius: 8px;
}

.love-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 0 15px;
}

.FM {
  color: #e59360;
  width: 60px;
  height: 16px;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  border: 1px solid #e59360;
  border-radius: 10px;
  margin-right: 10px;
}
</style>